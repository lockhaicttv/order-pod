import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { stageQueryKey } from '@app/containers/Stages/constants/stage.query-key'
import { Stage } from '@app/containers/Stages/types/stage.types'

const useGetStages = (query?: ListingQuery) => {
  return useQuery({
    queryKey: stageQueryKey.getAllStages(query),
    queryFn: async () => {
      return await callApi<DataEntry<Stage[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.stage}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetStages
