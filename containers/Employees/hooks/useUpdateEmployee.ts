import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateEmployeePayload } from '@app/containers/Employees/types/employee.types'

const useUpdateEmployee = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateRecipePayload: UpdateEmployeePayload) =>
      await callApi(`${KMAPP_ENDPOINT.employee}/update`, 'put', updateRecipePayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateEmployee
