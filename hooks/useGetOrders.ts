import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { Order } from '@app/types/orders.types'
import { DataEntry } from '@app/api'

const useGetOrders = () => {
  return useQuery({
    queryKey: ['getAllOrder'],
    queryFn: async () => {
      const response = await callApi<DataEntry<Order[], true>>(`${KMAPP_ENDPOINT.order}/all`, 'get')
      return response?.data
    }
  })
}

export default useGetOrders
