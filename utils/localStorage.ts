interface LocalStorage {
  setItem: (key: string, value: string) => void
  getItem: (key: string) => never
  removeItem: (key: string) => void
  updateItem: (key: string, value: string) => void
}

const ls: LocalStorage = {
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  getItem: (key: string) => JSON.parse(window.localStorage.getItem(key) || '') as never,
  removeItem: (key: string) => {
    localStorage.removeItem(key)
  },
  updateItem: (key: string, value: string) => {
    localStorage.removeItem(key)
    localStorage.setItem(key, value)
  }
}
export default ls

export const lsKeys = {
  authenticated: 'authenticated',
  token: 'token'
}
