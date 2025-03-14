import { Role } from '@app/containers/Roles/types/role.types'

interface BaseUser {
  id: string
  name: string
}

export interface User extends BaseUser {
  roles: Role[]
  status: number
  password: string
  userName: string
  displayName: string
}

export interface UpdateUserPayload extends User {}

export type CreateUserPayload = Omit<UpdateUserPayload, 'id'>
export interface DeleteUsersParams {
  id: string[]
}
