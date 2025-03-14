import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { Machine } from '@app/containers/Machines/types/machine.types'
import { machineQueryKey } from '@app/containers/Machines/constants/machine.query-key'

interface GetMachineParams {
  id: string
}
const useGetMachine = ({ id }: GetMachineParams) => {
  return useQuery({
    queryKey: machineQueryKey.getMachine(id),
    queryFn: async () => {
      return await callApi<DataEntry<Machine, true>, GetMachineParams>(
        `${KMAPP_ENDPOINT.machine}/id`,
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

export default useGetMachine
