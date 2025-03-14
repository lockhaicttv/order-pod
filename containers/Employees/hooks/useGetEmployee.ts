import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { Employee } from '@app/containers/Employees/types/employee.types'
import { employeeQueryKey } from '@app/containers/Employees/constants/employee.query-key'

interface GetEmployeeParams {
  id: string
}
const useGetEmployee = ({ id }: GetEmployeeParams) => {
  return useQuery({
    queryKey: employeeQueryKey.getEmployee(id),
    queryFn: async () => {
      return await callApi<DataEntry<Employee, true>, GetEmployeeParams>(
        `${KMAPP_ENDPOINT.employee}/id`,
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

export default useGetEmployee
