import { DownloadExportFileQuery } from '@app/containers/Dashboard/types/dashboard.types'

export const dashboardQueryKey = {
  getDashboard: (date: string) => ['get-dashboard', date],
  getExportFileType: ['get-export-file-type'],
  downloadExportFile: (query: DownloadExportFileQuery) => ['download-export-file', query]
}
