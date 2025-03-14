import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT, ListingQuery } from '@app/api'
import { ProductionQuota } from '@app/containers/ProductionQuotas/types/production-quota-type.types'
import { productionQuotaQueryKey } from '@app/containers/ProductionQuotas/constants/production-quota.query-key'

const useGetProductionQuotas = (query?: ListingQuery) => {
  return useQuery({
    queryKey: productionQuotaQueryKey.getAllProductionQuota(query),
    queryFn: async () => {
      return await callApi<DataEntry<ProductionQuota[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.productionQuota}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetProductionQuotas
