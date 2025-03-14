import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Process } from '@app/containers/Processes/types/process-type.types'
interface ProcessListColumns {
  onEdit: (process: Process) => void
  onDelete: (process: Process) => void
}
export const getProcessListColumns = ({ onEdit, onDelete }: ProcessListColumns): ColumnDef<Process>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Process Code'
  },
  {
    accessorKey: 'product.name',
    header: 'Product'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
