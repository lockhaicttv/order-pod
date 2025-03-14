import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { DailyReport } from '@app/containers/DailyReports/types/daily-report.types'
import { dailyReportQueryKey } from '@app/containers/DailyReports/constants/daily-report.query-key'

const useGetDailyReports = (query?: ListingQuery) => {
  return useQuery({
    queryKey: dailyReportQueryKey.getAllDailyReports(query),
    queryFn: async () => {
      return await callApi<DataEntry<DailyReport[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.dailyReport}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetDailyReports
