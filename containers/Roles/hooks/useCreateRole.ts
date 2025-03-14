import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateRolePayload, Role } from '@app/containers/Roles/types/role.types'

const useCreateRole = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createRolePayload: CreateRolePayload) =>
      await callApi<Role, undefined, CreateRolePayload>(`${KMAPP_ENDPOINT.role}/add`, 'post', createRolePayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateRole
