import { ReactNode } from 'react'

export interface MenuItemProps {
  name: string
  path?: string
  roles: string[]
  icon: ReactNode
  children?: MenuItemProps[]
}
