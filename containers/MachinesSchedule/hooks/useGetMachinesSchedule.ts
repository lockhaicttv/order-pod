import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { MachineSchedule } from '@app/containers/MachinesSchedule/constants/products-schedule.types'

interface Props {
  startDate: string
  orders?: string[]
}

interface GetMachineSchedulesPayload {
  list?: string[]
}

const useGetMachinesSchedule = ({ orders, startDate }: Props) => {
  return useQuery({
    queryKey: ['get-machine-schedule', orders],
    queryFn: async () => {
      return await callApi<MachineSchedule[], undefined, GetMachineSchedulesPayload>(
        `${KMAPP_ENDPOINT.planning}/machine?startDate=${startDate}`,
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

export default useGetMachinesSchedule
