import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { processQueryKey } from '@app/containers/Processes/constants/process.query-key'
import { ProductionQuota } from '@app/containers/ProductionQuotas/types/production-quota-type.types'

interface GetProductionQuotaParams {
  id: string
}
const useGetProductionQuota = ({ id }: GetProductionQuotaParams) => {
  return useQuery({
    queryKey: processQueryKey.getProcess(id),
    queryFn: async () => {
      return await callApi<DataEntry<ProductionQuota, true>, GetProductionQuotaParams>(
        `${KMAPP_ENDPOINT.productionQuota}/id`,
        'get',
        undefined,
        {
          id
        }
      )
    },
    enabled: !!id
  })
}

export default useGetProductionQuota
