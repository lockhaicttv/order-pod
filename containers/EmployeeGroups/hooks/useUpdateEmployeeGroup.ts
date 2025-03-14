import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateEmployeeGroupsPayload } from '@app/containers/EmployeeGroups/types/employee-group.types'

const useUpdateEmployeeGroup = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateRecipePayload: UpdateEmployeeGroupsPayload) =>
      await callApi(`${KMAPP_ENDPOINT.employeeGroup}/update`, 'put', updateRecipePayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateEmployeeGroup
