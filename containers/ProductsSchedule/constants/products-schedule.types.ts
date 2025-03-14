export interface Time {
  stageName: string
  startDate: string
  endDate: string
}

interface Schedule {
  productName: string
  time: Time[]
}

export interface OrderSchedule {
  orderCode: string
  customerName: string
  schedule: Schedule[]
}
