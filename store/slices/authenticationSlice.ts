import { StateCreator } from 'zustand'
import { MyState } from '@app/store'

export type AuthenticationSlice = NonNullable<unknown> & {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

const createAuthenticationSlice: StateCreator<MyState, [], [], AuthenticationSlice> = (set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value?: boolean) => set(() => ({ isAuthenticated: value }))
})

export default createAuthenticationSlice
