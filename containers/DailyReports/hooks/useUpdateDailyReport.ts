import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateDailyReportPayload } from '@app/containers/DailyReports/types/daily-report.types'

const useUpdateDailyReport = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateDailyPayload: UpdateDailyReportPayload) =>
      await callApi(`${KMAPP_ENDPOINT.dailyReport}/update`, 'put', updateDailyPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateDailyReport
