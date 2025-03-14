import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Machine } from '@app/containers/Machines/types/machine.types'
import { machineQueryKey } from '@app/containers/Machines/constants/machine.query-key'

const useGetMachines = (query?: ListingQuery) => {
  return useQuery({
    queryKey: machineQueryKey.getAllMachines(query),
    queryFn: async () => {
      return await callApi<DataEntry<Machine[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.machine}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetMachines
