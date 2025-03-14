import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { customerQueryKey } from '@app/containers/Customers/constants/customer.query-key'
import { Customer } from '@app/containers/Customers/types/customer.types'

const useGetCustomers = (query?: ListingQuery) => {
  return useQuery({
    queryKey: customerQueryKey.getAllCustomers(query),
    queryFn: async () => {
      return await callApi<DataEntry<Customer[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.customer}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetCustomers
