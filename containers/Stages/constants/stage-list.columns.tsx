import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Stage } from '@app/containers/Stages/types/stage.types'
interface StageListColumns {
  onEdit: (stage: Stage) => void
  onDelete: (stage: Stage) => void
}
export const getStageListColumns = ({ onEdit, onDelete }: StageListColumns): ColumnDef<Stage>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Stage Code'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'workingDept.name',
    header: 'Working department'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
