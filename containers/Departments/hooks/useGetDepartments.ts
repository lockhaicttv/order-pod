import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { departmentQueryKey } from '@app/containers/Departments/constants/department.query-key'
import { Department } from '@app/containers/Departments/types/department.types'

const useGetDepartments = (query?: ListingQuery) => {
  return useQuery({
    queryKey: departmentQueryKey.getAllDepartments(query),
    queryFn: async () => {
      return await callApi<DataEntry<Department[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.department}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetDepartments
