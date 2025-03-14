import { BaseStage } from '@app/containers/Stages/types/stage.types'
import { BaseEmployee, Employee } from '@app/containers/Employees/types/employee.types'
import { BaseProduct } from '@app/containers/Products/types/product.types'
import { Tool } from '@app/containers/Tools/types/tool.types'
interface Machine {
  id: string
  code: string
  name: string | null
}

interface Input {
  productInfo: BaseProduct
  weight: 0
}

interface Order {
  id: string
  code: string
}
export interface Ticket {
  id: string
  date: string
  stage: BaseStage
  shiftNumber: number
  status: TicketStatus
  assigneeLeader: Employee
  outputProduct: BaseProduct
  quotaWeight: number
  employee: number
  machines: Machine[]
  tools: Tool[]
  inputs: Input[]
  order: Order
  targetProduct: BaseProduct
  displaySequence: number
  planId: string
  employeeTickets: EmployeeTicket[]
}

export interface EmployeeTicket extends Pick<Ticket, 'id' | 'date' | 'status' | 'inputs' | 'quotaWeight'> {
  workingEmployee: BaseEmployee
  groupTicketId: string
  output: BaseProduct
  machine: Machine
}

export enum TicketStatus {
  ASSIGNEE = 'assignee',
  DOING = 'doing',
  OPEN = 'open',
  DONE = 'done'
}

export type GetTicketPlanningByDateQuery = {
  date: string | null
  stageId?: string | null
  orderId?: string | null
}

export type ChangeTicketStatusQuery = {
  id: string
  status: TicketStatus
}

export type UpdateAssigneeLeaderQuery = {
  ticketId: string
  employeeId: string
}

export type UpdateWorkingEmployeeQuery = UpdateAssigneeLeaderQuery

export type UpdateEmployeeTicketPayload = EmployeeTicket
export type UpdateTicketPayload = Ticket

export interface FilterProps {
  date?: string | null
  stageId?: string | null
  orderId?: string | null
}
