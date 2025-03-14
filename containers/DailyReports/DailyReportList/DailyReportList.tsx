import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getDailyReportListColumns } from '@app/containers/DailyReports/constants/daily-report-list.columns'
import {
  DAILY_REPORT_DETAIL_CREATE_ROUTE,
  DAILY_REPORT_DETAIL_EDIT_ROUTE
} from '@app/containers/DailyReports/constants/daily-report-routes.constants'
import { DailyReport } from '@app/containers/DailyReports/types/daily-report.types'
import useDeleteDailyReports from '@app/containers/DailyReports/hooks/useDeleteDailyReports'
import useGetDailyReports from '@app/containers/DailyReports/hooks/useGetDailyReports'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { dailyReportQueryKey } from '@app/containers/DailyReports/constants/daily-report.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const DailyReportList = () => {
  const { handlePaginationChange, pageSize, page } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteDailyReports } = useDeleteDailyReports()
  const queryClient = useQueryClient()

  const handleDelete = (dailyReport: DailyReport) => {
    mutateDeleteDailyReports(
      {
        id: [dailyReport.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete dailyReport ${dailyReport.id} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === dailyReportQueryKey.getAllDailyReports()[0]
          })
        }
      }
    )
  }
  const handleEdit = (dailyReport: DailyReport) => {
    router.push(`${DAILY_REPORT_DETAIL_EDIT_ROUTE(dailyReport.id)}`)
  }

  const { data: dailyReports, isLoading: isGettingDailyReports } = useGetDailyReports({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingDailyReports} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Daily Reports' totalItems={dailyReports?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${DAILY_REPORT_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Daily Report
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getDailyReportListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={dailyReports?.data || []}
          totalRecords={dailyReports?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default DailyReportList
