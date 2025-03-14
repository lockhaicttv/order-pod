import { Stage } from '@app/containers/Stages/types/stage.types'
import { Machine } from '@app/containers/Machines/types/machine.types'

export interface BaseRole {
  id: string
  roleName: string
  roleCode: string
  description: string
}

export interface Role extends BaseRole {
  privileges: Privileges[]
}

export interface Privileges {
  name: string
  type: number
}

export interface CreateRolePayload extends Omit<Role, 'id'> {}

export interface DeleteRolesParams {
  id: string[]
}

export interface GetRoleParams {
  id: string
}
