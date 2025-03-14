import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { GetPlanByOrderIdsParams, Plan } from '@app/containers/Plans/types/plan.types'
import { planQueryKey } from '@app/containers/Plans/constants/plan.query-key'

const useGetPlanByOrderCodes = ({ list }: GetPlanByOrderIdsParams) => {
  return useQuery({
    queryKey: planQueryKey.getPlanByListOrderId(list),
    queryFn: async () => {
      return await callApi<DataEntry<Plan, true>, GetPlanByOrderIdsParams>(
        `${KMAPP_ENDPOINT.planning}/general`,
        'get',
        undefined,
        {
          list
        }
      )
    },
    enabled: !!list.length
  })
}

export default useGetPlanByOrderCodes
