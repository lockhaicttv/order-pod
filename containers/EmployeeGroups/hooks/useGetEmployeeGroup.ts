import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { EmployeeGroup } from '@app/containers/EmployeeGroups/types/employee-group.types'
import { employeeGroupQueryKey } from '@app/containers/EmployeeGroups/constants/employee-group.query-key'

interface GetEmployeeParams {
  id: string
}
const useGetEmployeeGroup = ({ id }: GetEmployeeParams) => {
  return useQuery({
    queryKey: employeeGroupQueryKey.getEmployeeGroup(id),
    queryFn: async () => {
      return await callApi<DataEntry<EmployeeGroup, true>, GetEmployeeParams>(
        `${KMAPP_ENDPOINT.employeeGroup}/id`,
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

export default useGetEmployeeGroup
