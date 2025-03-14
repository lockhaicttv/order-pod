import { ListingQuery } from '@app/api'

export const productQueryKey = {
  getAllProduct: (query?: ListingQuery) => ['get-all-products', query],
  getProductById: (id: string) => ['get-product', id]
}
