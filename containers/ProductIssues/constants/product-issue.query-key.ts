import { ListingQuery } from '@app/api'

export const productIssueQueryKey = {
  getAllProductIssues: (query?: ListingQuery) => ['get-all-product-issues', query],
  getProductIssue: (id: string) => ['get-product-issue', id]
}
