import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { Order } from '@app/containers/Orders/types/order.types'
import { GetOrderParams } from '@app/containers/Orders/types/order.types'
import { orderQueryKey } from '@app/containers/Orders/constants/order.query-key'

const useGetOrder = ({ id }: GetOrderParams) => {
  return useQuery({
    queryKey: orderQueryKey.getOrder(id),
    queryFn: async () => {
      return await callApi<DataEntry<Order, true>, GetOrderParams>(`${KMAPP_ENDPOINT.order}/id`, 'get', undefined, {
        id
      })
    },
    enabled: !!id
  })
}

export default useGetOrder
