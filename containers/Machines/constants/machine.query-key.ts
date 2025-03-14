import { ListingQuery } from '@app/api'

export const machineQueryKey = {
  getAllMachines: (query?: ListingQuery) => ['get-all-chines', query],
  getMachine: (id: string) => ['get-machine', id]
}
