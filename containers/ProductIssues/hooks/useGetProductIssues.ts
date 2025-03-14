import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { ProductIssue } from '@app/containers/ProductIssues/types/product-issue.types'
import { productIssueQueryKey } from '@app/containers/ProductIssues/constants/product-issue.query-key'

const useGetProductIssues = (query?: ListingQuery) => {
  return useQuery({
    queryKey: productIssueQueryKey.getAllProductIssues(query),
    queryFn: async () => {
      return await callApi<DataEntry<ProductIssue[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.productIssue}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetProductIssues
