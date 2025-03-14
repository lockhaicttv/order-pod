import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'

interface DeleteDailyReportParams {
  id: string[]
}

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteDailyReportParams>
}

const useDeleteDailyReports = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteDailyReportParams: DeleteDailyReportParams) =>
      await callApi(`${KMAPP_ENDPOINT.dailyReport}/delete`, 'delete', undefined, deleteDailyReportParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteDailyReports
