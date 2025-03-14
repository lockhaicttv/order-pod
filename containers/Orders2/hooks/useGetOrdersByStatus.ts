import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Order } from '@app/containers/Orders2/types/order.types'
import { orderQueryKey } from '@app/containers/Orders2/constants/order.query-key'

const useGetOrdersByStatus = (
  query?: ListingQuery & {
    status: string
  }
) => {
  return useQuery({
    queryKey: orderQueryKey.getAllOrders(query),
    queryFn: async () => {
      return await callApi<DataEntry<Order[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.order}/status`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetOrdersByStatus
