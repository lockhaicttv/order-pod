import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { User } from '@app/containers/Users/types/user.types'
import { userQueryKey } from '@app/containers/Users/constants/user.query-key'

const useGetUsers = (query?: ListingQuery) => {
  return useQuery({
    queryKey: userQueryKey.getAllUsers(query),
    queryFn: async () => {
      return await callApi<DataEntry<User[], true>, ListingQuery>(`${KMAPP_ENDPOINT.user}/all`, 'get', undefined, query)
    }
  })
}

export default useGetUsers
