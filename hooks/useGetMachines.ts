import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { Machine } from '@app/types/machines.types'
import { DataEntry } from '@app/api'

const useGetMachines = () => {
  return useQuery({
    queryKey: ['getAllMachine'],
    queryFn: async () => {
      const response = await callApi<DataEntry<Machine[], true>>(`${KMAPP_ENDPOINT.machine}/all`, 'get')

      return response?.data
    }
  })
}

export default useGetMachines
