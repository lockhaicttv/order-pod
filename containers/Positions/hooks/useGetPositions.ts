import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Position } from '@app/containers/Positions/types/position.types'
import { positionQueryKey } from '@app/containers/Positions/constants/position.query-key'

const useGetPositions = (query?: ListingQuery) => {
  return useQuery({
    queryKey: positionQueryKey.getAllPositions(query),
    queryFn: async () => {
      return await callApi<DataEntry<Position[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.position}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetPositions
