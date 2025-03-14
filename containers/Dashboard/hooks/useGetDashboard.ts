import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { dashboardQueryKey } from '@app/containers/Dashboard/constants/dashboard.query-key'
import { Dashboard, GetDashboardDetailQuery } from '@app/containers/Dashboard/types/dashboard.types'
import { DataEntry } from '@app/api'

const useGetDashboard = (query?: GetDashboardDetailQuery) => {
  return useQuery({
    queryKey: dashboardQueryKey.getDashboard(query?.date || ''),
    queryFn: async () => {
      return await callApi<DataEntry<Dashboard>, GetDashboardDetailQuery>(
        `${KMAPP_ENDPOINT.dashboard}/daily`,
        'get',
        undefined,
        query
      )
    },
    enabled: !!query?.date
  })
}

export default useGetDashboard
