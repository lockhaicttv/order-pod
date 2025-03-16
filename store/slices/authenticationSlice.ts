import { StateCreator } from 'zustand'
import { MyState } from '@app/store'

export type AuthenticationSlice = NonNullable<unknown> & {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  setIsAgency: (value: boolean) => void
  isAgency: boolean
  token: string
  setToken: (token: string) => void
}

const createAuthenticationSlice: StateCreator<MyState, [], [], AuthenticationSlice> = (set) => ({
  isAuthenticated: false,
  isAgency: false,
  token: '',
  setToken: (value: string) => set({ token: value }),
  setIsAgency: (value: boolean) => set({ isAgency: value }),
  setIsAuthenticated: (value?: boolean) => set(() => ({ isAuthenticated: value }))
})

export default createAuthenticationSlice
