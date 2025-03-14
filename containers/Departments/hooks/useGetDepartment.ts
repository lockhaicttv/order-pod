import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { departmentQueryKey } from '@app/containers/Departments/constants/department.query-key'
import { Department, GetDepartmentParams } from '@app/containers/Departments/types/department.types'

const useGetDepartment = ({ id }: GetDepartmentParams) => {
  return useQuery({
    queryKey: departmentQueryKey.getDepartment(id),
    queryFn: async () => {
      return await callApi<DataEntry<Department, true>, GetDepartmentParams>(
        `${KMAPP_ENDPOINT.department}/id`,
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

export default useGetDepartment
