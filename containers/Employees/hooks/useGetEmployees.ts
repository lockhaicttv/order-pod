import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Employee } from '@app/containers/Employees/types/employee.types'
import { employeeQueryKey } from '@app/containers/Employees/constants/employee.query-key'

const useGetEmployees = (query?: ListingQuery) => {
  return useQuery({
    queryKey: employeeQueryKey.getAllEmployees(query),
    queryFn: async () => {
      return await callApi<DataEntry<Employee[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.employee}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetEmployees
