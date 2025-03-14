import { ListingQuery } from '@app/api'

export const stageQueryKey = {
  getAllStages: (query?: ListingQuery) => ['get-all-stages', query],
  getStage: (id: string) => ['get-stage', id]
}
