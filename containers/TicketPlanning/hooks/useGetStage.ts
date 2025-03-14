import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { Stage } from '@app/containers/Stages/types/stage.types'
import { stageQueryKey } from '@app/containers/Stages/constants/stage.query-key'

interface GetMachineParams {
  id: string
}
const useGetStage = ({ id }: GetMachineParams) => {
  return useQuery({
    queryKey: stageQueryKey.getStage(id),
    queryFn: async () => {
      return await callApi<DataEntry<Stage, true>, GetMachineParams>(`${KMAPP_ENDPOINT.stage}/id`, 'get', undefined, {
        id
      })
    },
    enabled: !!id
  })
}

export default useGetStage
