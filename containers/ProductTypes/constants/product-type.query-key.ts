import { ListingQuery } from '@app/api'

export const productTypeQueryKey = {
  getAllProductTypes: (query?: ListingQuery) => ['get-all-product-types', query]
}
