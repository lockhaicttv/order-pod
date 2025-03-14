import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Plan, PlanDetail } from '@app/containers/Plans/types/plan.types'

interface PlanDetailListColumns {
  onEdit: (planDetail: PlanDetail) => void
  onDelete: (planDetail: PlanDetail) => void
}
export const getPlanListColumns = ({ onEdit, onDelete }: PlanDetailListColumns): ColumnDef<PlanDetail>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'stage.code',
    header: 'Stage'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
