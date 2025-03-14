import { ListingQuery } from '@app/api'

export const planQueryKey = {
  getAllPlans: (query?: ListingQuery) => ['get-all-plans', query],
  getPlan: (id: string | string[]) => ['get-plan', id],
  getPlanByListOrderId: (orderIds?: string[]) => ['get-plan-by-list-order-id', orderIds],
  getPlanDetailById: (id: string) => ['get-plan-detail', id]
}
