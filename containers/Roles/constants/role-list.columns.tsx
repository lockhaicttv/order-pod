import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Role } from '@app/containers/Roles/types/role.types'
interface RoleListColumns {
  onEdit: (role: Role) => void
  onDelete: (role: Role) => void
}
export const getRoleListColumns = ({ onEdit, onDelete }: RoleListColumns): ColumnDef<Role>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'roleCode',
    header: 'Code'
  },
  {
    accessorKey: 'roleName',
    header: 'Name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
