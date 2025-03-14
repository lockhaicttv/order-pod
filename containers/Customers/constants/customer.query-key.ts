import { ListingQuery } from '@app/api'

export const customerQueryKey = {
  getAllCustomers: (query?: ListingQuery) => ['get-all-customers', query],
  getCustomer: (id: string) => ['get-customer', id]
}
