import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Tool } from '@app/containers/Tools/types/tool.types'
interface ToolListColumns {
  onEdit: (machine: Tool) => void
  onDelete: (machine: Tool) => void
}
export const getToolListColumns = ({ onEdit, onDelete }: ToolListColumns): ColumnDef<Tool>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'code',
    header: 'Tool Code'
  },
  {
    accessorKey: 'stage.code',
    header: 'Stage'
  },
  {
    accessorKey: 'cavity',
    header: 'Cavity'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
