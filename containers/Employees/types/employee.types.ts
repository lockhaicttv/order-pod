import { Department } from '@app/containers/Departments/types/department.types'
import { Machine } from '@app/containers/Machines/types/machine.types'
import { EmployeeGroup } from '@app/containers/EmployeeGroups/types/employee-group.types'
import { Position } from '@app/containers/Positions/types/position.types'

export interface BaseEmployee {
  id: string
  code: string
  name: string
}

export interface Employee extends BaseEmployee {
  dept: Department
  group: EmployeeGroup
  position: Position
}

export interface UpdateEmployeePayload extends Omit<Employee, 'dept' | 'group' | 'position'> {
  dept?: Department | null
  group?: EmployeeGroup | null
  position?: Position | null
}
export type CreateEmployeePayload = Omit<UpdateEmployeePayload, 'id'>
export interface DeleteEmployeesParams {
  id: string[]
}
