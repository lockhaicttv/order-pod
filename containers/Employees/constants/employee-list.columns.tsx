import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Employee } from '@app/containers/Employees/types/employee.types'
interface EmployeeListColumns {
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}
export const getEmployeeListColumns = ({ onEdit, onDelete }: EmployeeListColumns): ColumnDef<Employee>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Employee Code'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'group.name',
    header: 'Group'
  },
  {
    accessorKey: 'dept.name',
    header: 'Department'
  },
  {
    accessorKey: 'position.name',
    header: 'Position'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
