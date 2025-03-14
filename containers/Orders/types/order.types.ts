import { BaseProduct } from '@app/containers/Products/types/product.types'
import { Customer } from '@app/containers/Customers/types/customer.types'

export interface OrderDetail {
  id?: string | null
  product?: BaseProduct
  quantity: number
}

export interface BaseOrder {
  id?: string | null
  code: string
}

export interface Order extends BaseOrder {
  customer: Customer | null
  detail: OrderDetail[]
  projectValue: number
  projectStartDate: string // ISO date string
  projectEndDate: string // ISO date string
}

export interface UpdateOrderPayload extends Omit<Order, 'customer'> {
  customer?: Customer | null
}

export interface CreateOrderPayload extends Omit<UpdateOrderPayload, 'id'> {}

export interface DeleteOrdersParams {
  id: string[]
}

export interface GetOrderParams {
  id: string
}

export type CheckDeliveryDatePayload = Record<string, number>
