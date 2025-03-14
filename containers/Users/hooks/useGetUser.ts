import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { Position } from '@app/containers/Positions/types/position.types'
import { positionQueryKey } from '@app/containers/Positions/constants/position.query-key'

interface GetEmployeeParams {
  id: string
}
const useGetUser = ({ id }: GetEmployeeParams) => {
  return useQuery({
    queryKey: positionQueryKey.getPosition(id),
    queryFn: async () => {
      return await callApi<DataEntry<Position, true>, GetEmployeeParams>(
        `${KMAPP_ENDPOINT.position}/id`,
        'get',
        undefined,
        {
          id
        }
      )
    },
    enabled: !!id
  })
}

export default useGetUser
