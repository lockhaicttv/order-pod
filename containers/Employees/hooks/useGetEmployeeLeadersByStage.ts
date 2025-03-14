import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Employee } from '@app/containers/Employees/types/employee.types'
import { employeeQueryKey } from '@app/containers/Employees/constants/employee.query-key'

const useGetEmployeeLeadersByStage = (stageId: string) => {
  return useQuery({
    queryKey: employeeQueryKey.getEmployeeLeaderByStages(stageId),
    queryFn: async () => {
      return await callApi<DataEntry<Employee[], true>, { stageId: string }>(
        `${KMAPP_ENDPOINT.employee}/stage/leader`,
        'get',
        undefined,
        {
          stageId
        }
      )
    },
    enabled: !!stageId
  })
}

export default useGetEmployeeLeadersByStage
