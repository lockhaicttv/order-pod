import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { ProductIssue } from '@app/containers/ProductIssues/types/product-issue.types'
import { productIssueQueryKey } from '@app/containers/ProductIssues/constants/product-issue.query-key'

interface GetMachineParams {
  id: string
}
const useGetProductIssue = ({ id }: GetMachineParams) => {
  return useQuery({
    queryKey: productIssueQueryKey.getProductIssue(id),
    queryFn: async () => {
      return await callApi<DataEntry<ProductIssue, true>, GetMachineParams>(
        `${KMAPP_ENDPOINT.productIssue}/id`,
        'get',
        undefined,
        {
          id
        }
      )
    },
    enabled: !!id
  })
}

export default useGetProductIssue
