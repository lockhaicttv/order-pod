import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateEmployeeGroupPayload } from '@app/containers/EmployeeGroups/types/employee-group.types'

const useCreateEmployeeGroup = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createEmployeePayload: CreateEmployeeGroupPayload) =>
      await callApi(`${KMAPP_ENDPOINT.employeeGroup}/add`, 'post', createEmployeePayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateEmployeeGroup
