import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { GetPlanDetailQuery, PlanDetail } from '@app/containers/Plans/types/plan.types'
import { planQueryKey } from '@app/containers/Plans/constants/plan.query-key'

const useGetPlanDetail = (query: GetPlanDetailQuery) => {
  return useQuery({
    queryKey: planQueryKey.getPlanDetailById(query.id),
    queryFn: async () => {
      return await callApi<DataEntry<PlanDetail, true>, GetPlanDetailQuery>(
        `${KMAPP_ENDPOINT.planDetail}/id`,
        'get',
        undefined,
        {
          ...query
        }
      )
    },
    enabled: !!query.id
  })
}

export default useGetPlanDetail
