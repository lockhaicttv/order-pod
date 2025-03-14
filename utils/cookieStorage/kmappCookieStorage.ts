import createCookieStore from '../cookieStorage/createCookieStore'
import { COOKIE_KEY } from '@app/constants/storage'

export type KmappCookieStorage = {
  token: string | null
  expireTime: number
}

export const kmappCookieStorageDefault: KmappCookieStorage = {
  token: null,
  expireTime: 0
}

export const kmappCookieValidate = (data: unknown): KmappCookieStorage =>
  JSON.parse(data as string) as KmappCookieStorage

export const kmappCookie = createCookieStore<KmappCookieStorage>(
  COOKIE_KEY.kmapp,
  kmappCookieValidate,
  kmappCookieStorageDefault
)
