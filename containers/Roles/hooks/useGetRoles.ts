import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Role } from '@app/containers/Roles/types/role.types'
import { roleQueryKey } from '@app/containers/Roles/constants/role.query-key'

const useGetRoles = (query?: ListingQuery) => {
  return useQuery({
    queryKey: roleQueryKey.getAllRoles(query),
    queryFn: async () => {
      return await callApi<DataEntry<Role[], true>, ListingQuery>(`${KMAPP_ENDPOINT.role}/all`, 'get', undefined, query)
    }
  })
}

export default useGetRoles
