import { BaseEmployee, Employee } from '@app/containers/Employees/types/employee.types'
import { Product } from '@app/containers/Products/types/product.types'
import { BaseMachine } from '@app/containers/Machines/types/machine.types'
import { ProductIssue } from '@app/containers/ProductIssues/types/product-issue.types'
import { EmployeeGroup } from '@app/containers/EmployeeGroups/types/employee-group.types'

export interface ProductInfo {
  id?: string | null
  code: string
  info: Product
  weight: number
  quantity: number
}

export interface ProducingInfo {
  input: MaterialsInput[]
  output: ProductInfo
  machine: BaseMachine | null
}

export interface MaterialsInput {
  material: ProductInfo
  weight: number
  returnQuantity: number
  returnWeight: number
  notes: string[] | null
}

export interface IssueProduct {
  product: ProductInfo
  issue: ProductIssue
  weight: number
  quantity: number
  notes: string[] | null
}

export interface ReturnMaterial {
  product: ProductInfo
  weight: number
  quantity: number
  notes: string[] | null
}

export interface ReportEmployeeGroup extends Omit<EmployeeGroup, 'employees'> {
  employees?: BaseEmployee[] | null
}

export interface ReportEmployee extends Omit<Employee, 'group'> {
  group: ReportEmployeeGroup
}

export interface DailyReport {
  id: string
  date: string
  reportEmployee: ReportEmployee
  workingEmployee: ReportEmployee
  tickets: string[]
  producingInfos: ProducingInfo[]
  issueProducts: IssueProduct[] | null
  // returnMaterials: ReturnMaterial[] | null
}

export interface UpdateDailyReportPayload extends DailyReport {}

export interface CreateDailyReportPayload extends Omit<UpdateDailyReportPayload, 'id'> {}
