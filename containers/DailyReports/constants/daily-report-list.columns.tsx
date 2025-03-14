import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { DailyReport } from '@app/containers/DailyReports/types/daily-report.types'
import dayjs from 'dayjs'
import Tooltip from '@app/components/Tooltip'
interface DailyReportListColumns {
  onEdit: (dailyReport: DailyReport) => void
  onDelete: (dailyReport: DailyReport) => void
}
export const getDailyReportListColumns = ({ onEdit, onDelete }: DailyReportListColumns): ColumnDef<DailyReport>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'reportEmployee.name',
    header: 'Report Employee'
  },
  {
    accessorKey: 'workingEmployee.name',
    header: 'Working Employee'
  },
  {
    accessorKey: 'tickets',
    header: 'Tickets',
    cell: ({ row }) => {
      return (
        <div>
          <Tooltip popupContent={row.original.tickets.join(', ')}>
            <div>{row.original?.tickets.length || '---'}</div>
          </Tooltip>
        </div>
      )
    }
  },
  {
    accessorKey: 'issueProducts',
    header: 'Issue Products',
    cell: ({ row }) => {
      return row.original?.issueProducts?.map((issueProduct) => issueProduct.product?.code).join(', ')
    }
  },
  // {
  //   accessorKey: 'returnMaterials',
  //   header: 'Return Materials',
  //   cell: ({ row }) => {
  //     return row.original?.returnMaterials?.map((returnMaterial) => returnMaterial.product?.code).join(', ')
  //   }
  // },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => dayjs(row.original.date).format('DD-MM-YYYY')
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
