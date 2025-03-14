import * as cookie from 'cookie'
import { useEffect, useState } from 'react'

export function getCookieValue(key: string, cookies: string, options?: cookie.ParseOptions, defaultValue = ''): string {
  const value = cookie.parse(cookies || '', options)

  return value[key] ?? defaultValue
}

export function pushCookie(key: string, value: string, encodeOps?: cookie.SerializeOptions): void {
  document.cookie = cookie.serialize(key, value, encodeOps)
}

const maybeWindow = typeof window === 'undefined' ? undefined : window

export const cookieStorageChangeEventName = 'cookieStorageChange'

export type CookieStorageManager<T> = {
  read(): T

  get(): T

  getByKey<K extends keyof T>(key: K): T[K] | null

  set(data: T | ((data: T) => T), maxAge?: number): void

  remove(): void

  watch(listener: (data: T) => void): () => void

  useStore(): T

  checkExpire(): boolean

  destroy(): void
}

function createCookieStore<T>(
  key: string,
  validate: (data: unknown) => T,
  defaultValue: T,
  options?: { decodeOps?: cookie.ParseOptions; encodeOps?: cookie.SerializeOptions }
): CookieStorageManager<T>

function createCookieStore<T>(
  key: string,
  validate: (data: unknown) => T,
  options?: { decodeOps?: cookie.ParseOptions; encodeOps?: cookie.SerializeOptions }
): CookieStorageManager<T | void>

function createCookieStore<T>(
  key: string,
  validate: (data: unknown) => T,
  defaultValue?: T,
  options?: { decodeOps?: cookie.ParseOptions; encodeOps?: cookie.SerializeOptions }
) {
  type Cache = { value?: T | undefined }

  const cache: Cache = {}

  const createLocalEvent = () =>
    new CustomEvent(cookieStorageChangeEventName, {
      detail: cache
    })

  const dispatchChange = () => {
    maybeWindow?.dispatchEvent(createLocalEvent())
  }

  const events = maybeWindow && new maybeWindow.EventTarget()

  const localListener = (event: Event) => {
    const customEvent = event as CustomEvent<Cache>
    if ('value' in customEvent.detail) {
      cache.value = customEvent.detail.value
    } else {
      delete cache.value
    }

    events?.dispatchEvent(createLocalEvent())
  }

  const multiTabListener = () => {
    delete cache.value

    events?.dispatchEvent(createLocalEvent())
  }

  if (maybeWindow) {
    maybeWindow?.addEventListener(cookieStorageChangeEventName, localListener)
    maybeWindow?.addEventListener('cookieStorage', multiTabListener)
  }

  const store = {
    read() {
      if (maybeWindow === undefined) return defaultValue

      const value = getCookieValue(key, maybeWindow?.document.cookie, options?.decodeOps, JSON.stringify(defaultValue))

      if (value === null) {
        return defaultValue
      }

      try {
        return validate(value)
      } catch (_) {
        return defaultValue
      }
    },

    get() {
      if (!('value' in cache)) {
        cache.value = store.read()
      }

      return cache.value
    },

    getByKey<K extends keyof T>(key: K): T[K] | null {
      if (!('value' in cache)) {
        cache.value = store.read()
      }

      return cache.value?.[key] ? (cache.value[key] as T[K]) : null
    },

    set(data: T | ((data: T | undefined) => T), maxAge?: number) {
      const newValue = data instanceof Function ? data(store.get()) : data

      pushCookie(key, JSON.stringify(newValue), { ...options?.encodeOps, maxAge, path: '/' })
      cache.value = newValue
      dispatchChange()
    },

    remove() {
      if (maybeWindow) {
        maybeWindow.document.cookie = cookie.serialize(key, '', {
          maxAge: -1,
          path: '/'
        })

        cache.value = defaultValue
        dispatchChange()
      }
    },

    watch(listener: (data: T | undefined) => void) {
      const wrappedListener = () => listener(store.get())

      events?.addEventListener(cookieStorageChangeEventName, wrappedListener)

      return () => {
        events?.removeEventListener(cookieStorageChangeEventName, wrappedListener)
      }
    },

    checkExpire() {
      if (maybeWindow) {
        const expireTime = JSON.parse(cookie.parse(document.cookie)[key] || '{}')

        return expireTime && new Date() > new Date(expireTime)
      }

      return true
    },

    useStore() {
      const [value, setValue] = useState<T | undefined>(store.get)

      useEffect(() => store.watch(setValue), [])

      return value
    },

    destroy() {
      maybeWindow?.removeEventListener(cookieStorageChangeEventName, localListener)
      maybeWindow?.removeEventListener('cookieStorage', multiTabListener)
    }
  }

  return store
}

export default createCookieStore
