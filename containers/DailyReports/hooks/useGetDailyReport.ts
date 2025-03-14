import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { DailyReport } from '@app/containers/DailyReports/types/daily-report.types'
import { dailyReportQueryKey } from '@app/containers/DailyReports/constants/daily-report.query-key'

interface GetDailyReportParams {
  id: string
}
const useGetDailyReport = ({ id }: GetDailyReportParams) => {
  return useQuery({
    queryKey: dailyReportQueryKey.getDailyReport(id),
    queryFn: async () => {
      return await callApi<DataEntry<DailyReport, true>, GetDailyReportParams>(
        `${KMAPP_ENDPOINT.dailyReport}/id`,
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

export default useGetDailyReport
