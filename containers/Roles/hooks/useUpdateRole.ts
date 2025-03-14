import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Role } from '@app/containers/Roles/types/role.types'

export interface UpdateRolePayload extends Role {}

const useUpdateRole = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateRecipePayload: UpdateRolePayload) =>
      await callApi(`${KMAPP_ENDPOINT.role}/update`, 'put', updateRecipePayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateRole
