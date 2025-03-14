import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { roleQueryKey } from '@app/containers/Roles/constants/role.query-key'
import { GetRoleParams, Role } from '@app/containers/Roles/types/role.types'

const useGetRole = ({ id }: GetRoleParams) => {
  return useQuery({
    queryKey: roleQueryKey.getRole(id),
    queryFn: async () => {
      return await callApi<DataEntry<Role, true>, GetRoleParams>(`${KMAPP_ENDPOINT.role}/id`, 'get', undefined, {
        id
      })
    },
    enabled: !!id
  })
}

export default useGetRole
