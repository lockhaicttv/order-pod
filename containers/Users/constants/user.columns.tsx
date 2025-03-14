import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { User } from '@app/containers/Users/types/user.types'
interface UserListColumns {
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}
export const getUserListColumns = ({ onEdit, onDelete }: UserListColumns): ColumnDef<User>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'user_name',
    header: 'Username'
  },
  {
    accessorKey: 'display_name',
    header: 'Display name'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'roles',
    header: 'Role',
    cell: ({ row }) => {
      return row.original?.roles?.map((role) => role?.roleName).join(', ')
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
