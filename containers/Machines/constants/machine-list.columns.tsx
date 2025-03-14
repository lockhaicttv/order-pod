import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Machine } from '@app/containers/Machines/types/machine.types'
interface MachineListColumns {
  onEdit: (machine: Machine) => void
  onDelete: (machine: Machine) => void
}
export const getMachineListColumns = ({ onEdit, onDelete }: MachineListColumns): ColumnDef<Machine>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Machine Code'
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
