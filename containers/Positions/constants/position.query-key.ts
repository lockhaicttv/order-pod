import { ListingQuery } from '@app/api'

export const positionQueryKey = {
  getAllPositions: (query?: ListingQuery) => ['get-all-positions', query],
  getPosition: (id: string) => ['get-position', id]
}
