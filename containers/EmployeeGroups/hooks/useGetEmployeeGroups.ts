import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { EmployeeGroup } from '@app/containers/EmployeeGroups/types/employee-group.types'
import { employeeGroupQueryKey } from '@app/containers/EmployeeGroups/constants/employee-group.query-key'

const useGetEmployeeGroups = (query?: ListingQuery) => {
  return useQuery({
    queryKey: employeeGroupQueryKey.getAllEmployeeGroups(query),
    queryFn: async () => {
      return await callApi<DataEntry<EmployeeGroup[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.employeeGroup}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetEmployeeGroups
