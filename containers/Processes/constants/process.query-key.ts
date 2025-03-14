import { ListingQuery } from '@app/api'

export const processQueryKey = {
  getAllProcesses: (query?: ListingQuery) => ['get-all-processes', query],
  getProcess: (id: string) => ['get-process', id]
}
