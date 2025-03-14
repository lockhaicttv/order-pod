import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Customer } from '@app/containers/Customers/types/customer.types'
interface CustomerListColumns {
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}
export const getCustomerListColumns = ({ onEdit, onDelete }: CustomerListColumns): ColumnDef<Customer>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Customer Code'
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
