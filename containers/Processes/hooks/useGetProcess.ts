import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { processQueryKey } from '@app/containers/Processes/constants/process.query-key'
import { Process } from '@app/containers/Processes/types/process-type.types'

interface GetProcessParams {
  id: string
}
const useGetProcess = ({ id }: GetProcessParams) => {
  return useQuery({
    queryKey: processQueryKey.getProcess(id),
    queryFn: async () => {
      return await callApi<DataEntry<Process, true>, GetProcessParams>(
        `${KMAPP_ENDPOINT.process}/id`,
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

export default useGetProcess
