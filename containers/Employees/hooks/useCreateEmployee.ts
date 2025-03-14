import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateEmployeePayload } from '@app/containers/Employees/types/employee.types'

const useCreateEmployee = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createEmployeePayload: CreateEmployeePayload) =>
      await callApi(`${KMAPP_ENDPOINT.employee}/add`, 'post', createEmployeePayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateEmployee
