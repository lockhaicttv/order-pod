import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { toolQueryKey } from '@app/containers/Tools/constants/tool.query-key'
import { Tool } from '@app/containers/Tools/types/tool.types'

const useGetTools = (query?: ListingQuery) => {
  return useQuery({
    queryKey: toolQueryKey.getAllTools(query),
    queryFn: async () => {
      return await callApi<DataEntry<Tool[], true>, ListingQuery>(`${KMAPP_ENDPOINT.tool}/all`, 'get', undefined, query)
    }
  })
}

export default useGetTools
