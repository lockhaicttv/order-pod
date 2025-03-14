import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteEmployeeGroupsParams } from '@app/containers/EmployeeGroups/types/employee-group.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteEmployeeGroupsParams>
}

const useDeleteEmployeeGroups = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteEmployeesParams: DeleteEmployeeGroupsParams) =>
      await callApi(`${KMAPP_ENDPOINT.employeeGroup}/delete`, 'delete', undefined, deleteEmployeesParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteEmployeeGroups
