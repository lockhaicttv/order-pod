import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Position } from '@app/containers/Positions/types/position.types'
interface PositionListColumns {
  onEdit: (employee: Position) => void
  onDelete: (employee: Position) => void
}
export const getPositionListColumns = ({ onEdit, onDelete }: PositionListColumns): ColumnDef<Position>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
