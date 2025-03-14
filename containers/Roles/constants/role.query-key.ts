import { ListingQuery } from '@app/api'

export const roleQueryKey = {
  getAllRoles: (query?: ListingQuery) => ['get-all-roles', query],
  getRole: (id: string) => ['get-role', id]
}
