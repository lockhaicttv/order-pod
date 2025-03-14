import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateDailyReportPayload } from '@app/containers/DailyReports/types/daily-report.types'

const useCreateDailyReport = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createDailyReportPayload: CreateDailyReportPayload) =>
      await callApi(`${KMAPP_ENDPOINT.dailyReport}/add`, 'post', createDailyReportPayload),
    onSuccess: () => {},
    onError: (error) => {
      console.log(error)
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateDailyReport
