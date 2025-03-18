import { Customer } from '@app/containers/Customers/types/customer.types'

export interface Agency {
  id: string
  name: string
  type: string
  phone: string
  address: string
  email: string
  note: string
}

export interface Product {
  id: string
  name: string
  category: string
  type: string
  color: string
  size: string
}

export interface OrderDetail {
  id: string
  product: Product
  quantity: number
  frontDesign: string
  mockupFront: string
  backDesign: string
  mockupBack: string
  note: string
}

export interface Order {
  id: string
  agencyOrderCode: string
  agency: Agency
  customerName: string
  customerAddress1: string
  customerAddress2: string
  city: string
  region: string
  zip: string
  country: string
  email: string
  phone: string
  totalQuantity: number
  orderDate: string // ISO 8601 date string
  requestDate: string
  deliveryDate: string
  lastUpdateDate: string
  detail: OrderDetail[]
  status: Status
  label: string
}

export enum Status {
  INITIAL = 'initial',
  PROCESSING = 'processing',
  DONE = 'done',
  CANCELED = 'canceled'
}

export interface UpdateOrderPayload extends Omit<Order, 'customer'> {
  customer?: Customer | null
}

export interface UpdateOrderStatusPayload {
  orderId: string
  status: Status
}

export interface CreateOrderPayload extends Omit<UpdateOrderPayload, 'id'> {}

export interface DeleteOrdersParams {
  id: string[]
}

export interface GetOrderParams {
  id: string
}

export type CheckDeliveryDatePayload = Record<string, number>
