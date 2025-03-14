import { ListingQuery } from '@app/api'

export const orderQueryKey = {
  getAllOrders: (query?: ListingQuery) => ['get-all-orders', query],
  getOrder: (id: string) => ['get-order', id]
}
