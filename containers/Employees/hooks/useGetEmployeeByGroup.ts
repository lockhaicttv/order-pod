import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Employee } from '@app/containers/Employees/types/employee.types'
import { employeeQueryKey } from '@app/containers/Employees/constants/employee.query-key'

const useGetEmployeeGroup = (groupId: string) => {
  return useQuery({
    queryKey: employeeQueryKey.getEmployeeLeaderByGroup(groupId),
    queryFn: async () => {
      return await callApi<DataEntry<Employee[], true>, { groupId: string }>(
        `${KMAPP_ENDPOINT.employee}/group`,
        'get',
        undefined,
        {
          groupId
        }
      )
    },
    enabled: !!groupId
  })
}

export default useGetEmployeeGroup
