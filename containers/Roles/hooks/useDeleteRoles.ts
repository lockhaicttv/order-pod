import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteRolesParams } from '@app/containers/Roles/types/role.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteRolesParams>
}

const useDeleteRoles = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteRolesParams: DeleteRolesParams) =>
      await callApi(`${KMAPP_ENDPOINT.machine}/delete`, 'delete', undefined, deleteRolesParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteRoles
