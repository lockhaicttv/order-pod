import { ListingQuery } from '@app/api'

export const productionQuotaQueryKey = {
  getAllProductionQuota: (query?: ListingQuery) => ['get-all-production-quota', query],
  getProductionQuota: (id: string) => ['get-production-quota', id]
}
