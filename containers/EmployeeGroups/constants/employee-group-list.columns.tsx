import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { EmployeeGroup } from '@app/containers/EmployeeGroups/types/employee-group.types'
interface EmployeeGroupGroupListColumns {
  onEdit: (employee: EmployeeGroup) => void
  onDelete: (employee: EmployeeGroup) => void
}
export const getEmployeeGroupListColumns = ({
  onEdit,
  onDelete
}: EmployeeGroupGroupListColumns): ColumnDef<EmployeeGroup>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Group Name'
  },
  {
    accessorKey: 'code',
    header: 'Code'
  },
  {
    accessorKey: 'dept.name',
    header: 'Department'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
