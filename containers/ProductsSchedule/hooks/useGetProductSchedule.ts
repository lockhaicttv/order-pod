import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { OrderSchedule } from '@app/containers/ProductsSchedule/constants/products-schedule.types'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'

interface Props {
  startDate: string
  orders?: string[]
}

interface GetProductSchedulePayload {
  list?: string[]
}

const useGetProductSchedule = ({ orders, startDate }: Props) => {
  return useQuery({
    queryKey: ['get-order-schedule', orders],
    queryFn: async () => {
      return await callApi<OrderSchedule[], undefined, GetProductSchedulePayload>(
        `${KMAPP_ENDPOINT.planning}/order?startDate=${startDate}`,
        'put',
        {
          list: orders
        }
      )
    },
    gcTime: 0,
    staleTime: 0,
    enabled: !!orders?.length
  })
}

export default useGetProductSchedule
