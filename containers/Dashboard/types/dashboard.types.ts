export interface DistributedResource {
  name: string
  real: number
  plan: number
}

export interface ProducingOfStages {
  name: string
  plan: number
  real: number
}

export interface WorkingProcess {
  doing: number
  done: number
  open: number
}

export interface ProductQuality {
  Issue: number
  Pass: number
}

export interface OrderProcess {
  order: string
  orderEndDate: string
  status: string | null
  progressing: number
}

export interface ProductIssue {
  name: string
  numbers: number
}

export interface Dashboard {
  date: string
  openOrder: number
  quotaProducts: number
  numberOfTickets: number
  requestWorkingTimes: number
  requestEmployees: number
  distributedResouces: DistributedResource[]
  workingProcess: WorkingProcess
  productQuality: ProductQuality
  producingWeightOfStages: ProducingOfStages[]
  producingQuantityOfStages: ProducingOfStages[]
  productIssue: ProductIssue[]
  orderProcess: OrderProcess[]
  issueTypes: Record<string, number>
}

export interface GetDashboardDetailQuery {
  date: string
}

export interface DownloadExportFileQuery {
  startDate: string
  endDate: string
  exportType: string
}
