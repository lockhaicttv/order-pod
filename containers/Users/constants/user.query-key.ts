import { ListingQuery } from '@app/api'

export const userQueryKey = {
  getAllUsers: (query?: ListingQuery) => ['get-all-users', query],
  getUser: (id: string) => ['get-user', id]
}
