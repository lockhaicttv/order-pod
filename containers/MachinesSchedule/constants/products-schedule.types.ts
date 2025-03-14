interface Time {
  orderCode: string
  customer: string
  startDate: string
  endDate: string
}

export interface MachineSchedule {
  name: string
  stage: string
  time: Time[]
}
