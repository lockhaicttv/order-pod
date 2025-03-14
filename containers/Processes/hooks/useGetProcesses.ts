import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT, ListingQuery } from '@app/api'
import { processQueryKey } from '@app/containers/Processes/constants/process.query-key'
import { Process } from '@app/containers/Processes/types/process-type.types'

const useGetProcesses = (query?: ListingQuery) => {
  return useQuery({
    queryKey: processQueryKey.getAllProcesses(query),
    queryFn: async () => {
      return await callApi<DataEntry<Process[], true>, ListingQuery, undefined>(
        `${KMAPP_ENDPOINT.process}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetProcesses
