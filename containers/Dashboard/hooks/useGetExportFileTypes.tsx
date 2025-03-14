import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { dashboardQueryKey } from '@app/containers/Dashboard/constants/dashboard.query-key'
import { DataEntry } from '@app/api'

const useGetExportFileTypes = () => {
  return useQuery({
    queryKey: [dashboardQueryKey.getExportFileType],
    queryFn: async () => {
      return await callApi<DataEntry<string[]>>(`${KMAPP_ENDPOINT.file}/export-type/all`, 'get', undefined)
    }
  })
}

export default useGetExportFileTypes
