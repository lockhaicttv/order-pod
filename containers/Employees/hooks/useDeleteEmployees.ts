import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteEmployeesParams } from '@app/containers/Employees/types/employee.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteEmployeesParams>
}

const useDeleteEmployees = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteEmployeesParams: DeleteEmployeesParams) =>
      await callApi(`${KMAPP_ENDPOINT.employee}/delete`, 'delete', undefined, deleteEmployeesParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteEmployees
