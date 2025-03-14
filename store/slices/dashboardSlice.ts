import { StateCreator } from 'zustand'
import { MyState } from '@app/store'

export type DashboardSlice = NonNullable<unknown> & TotalProductValue

export interface TotalProductValue {
  totalValue: number
  totalProduct: number
  chartData: {
    quantity: number
    productName: string
  }[]
}

const createDashboardSlice: StateCreator<MyState, [], [], DashboardSlice> = (set) => ({
  chartData: [
    {
      productName: 'A',
      quantity: 100
    },
    {
      productName: 'B',
      quantity: 500
    },
    {
      productName: 'C',
      quantity: 1500
    }
  ],
  totalProduct: 1800,
  totalValue: 19098789
})

export default createDashboardSlice
