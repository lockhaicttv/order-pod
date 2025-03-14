import create from 'zustand'
import createNavigationControlSlice, { NavigationControlSlice } from './slices/navigationControlSlice'
import createDashboardSlice, { DashboardSlice } from './slices/dashboardSlice'
import createAuthenticationSlice, { AuthenticationSlice } from '@app/store/slices/authenticationSlice'

const useStore = create<MyState>()((...a) => ({
  ...createNavigationControlSlice(...a),
  ...createDashboardSlice(...a),
  ...createAuthenticationSlice(...a)
}))

export default useStore

export type MyState = NavigationControlSlice & DashboardSlice & AuthenticationSlice
