import { StateCreator } from 'zustand'
import { MyState } from '@app/store'

export interface NavigationControlSlice {
  broken: boolean
  toggled: boolean
  collapse: boolean
  darkTheme: boolean
  backgroundImage: boolean
  changeBroken: (value?: boolean) => void
  toggleNavigation: (value: boolean) => void
  toggleCollapse: () => void
  toggleDarkTheme: () => void
  toggleBackgroundImage: () => void
}

const createNavigationControlSlice: StateCreator<MyState, [], [], NavigationControlSlice> = (set) => ({
  broken: false,
  toggled: false,
  collapse: false,
  darkTheme: false,
  backgroundImage: false,
  changeBroken: (value?: boolean) => set(() => ({ broken: value })),
  toggleCollapse: () => set((state) => ({ collapse: !state.collapse })),
  toggleNavigation: (value?: boolean) => set(() => ({ toggled: value })),
  toggleDarkTheme: () => set((state) => ({ collapse: !state.collapse })),
  toggleBackgroundImage: () => set((state) => ({ collapse: !state.collapse }))
})

export default createNavigationControlSlice
