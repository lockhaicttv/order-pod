import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DownloadExportFileQuery } from '@app/containers/Dashboard/types/dashboard.types'

const useDownloadExportFile = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (query: DownloadExportFileQuery) =>
      await callApi<string, DownloadExportFileQuery>(`${KMAPP_ENDPOINT.file}/download-with-endcode`, 'get', undefined, query),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDownloadExportFile
