import { Department } from '@app/containers/Departments/types/department.types'
import { BaseEmployee } from '@app/containers/Employees/types/employee.types'

interface BaseEmployeeGroup {
  id: string
  code: string
  name: string
}

export interface EmployeeGroup extends BaseEmployeeGroup {
  dept: Department
  employees: BaseEmployee[]
}

export interface UpdateEmployeeGroupsPayload extends Omit<EmployeeGroup, 'dept'> {
  dept?: Department | null
}
export type CreateEmployeeGroupPayload = Omit<UpdateEmployeeGroupsPayload, 'id'>
export interface DeleteEmployeeGroupsParams {
  id: string[]
}
