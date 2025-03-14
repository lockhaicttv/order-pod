import { ListingQuery } from '@app/api'

export const toolQueryKey = {
  getAllTools: (query?: ListingQuery) => ['get-all-tools', query],
  getTool: (id?: string) => ['get-tool', id]
}
