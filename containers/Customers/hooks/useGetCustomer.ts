import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { toolQueryKey } from '@app/containers/Tools/constants/tool.query-key'
import { Customer, GetMachineParams } from '@app/containers/Customers/types/customer.types'

const useGetCustomer = ({ id }: GetMachineParams) => {
  return useQuery({
    queryKey: toolQueryKey.getTool(id),
    queryFn: async () => {
      return await callApi<DataEntry<Customer, true>, GetMachineParams>(`${KMAPP_ENDPOINT.tool}/id`, 'get', undefined, {
        id
      })
    },
    enabled: !!id
  })
}

export default useGetCustomer
