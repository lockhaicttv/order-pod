import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Department } from '@app/containers/Departments/types/department.types'
interface DepartmentListColumns {
  onEdit: (department: Department) => void
  onDelete: (department: Department) => void
}
export const getDepartmentListColumns = ({ onEdit, onDelete }: DepartmentListColumns): ColumnDef<Department>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Department Code'
  },
  {
    accessorKey: 'name',
    header: 'Department name'
  },
  {
    accessorKey: 'shiftPerDay',
    header: 'Shift per day'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
