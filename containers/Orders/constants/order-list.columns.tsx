import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Order } from '@app/containers/Orders/types/order.types'
import { dateFormat } from '@app/utils/formatDate'
interface OrderListColumns {
  onEdit: (order: Order) => void
  onDelete: (order: Order) => void
}
export const getOrderListColumns = ({ onEdit, onDelete }: OrderListColumns): ColumnDef<Order>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Order Code'
  },
  {
    accessorKey: 'customer.name',
    header: 'Customer'
  },
  {
    accessorKey: 'projectValue',
    header: 'Value',
    cell: ({ row }) => <div>{row.original.projectValue.toLocaleString()}</div>
  },
  {
    accessorKey: 'projectStartDate',
    header: 'Start date',
    cell: ({ row }) => <div>{dateFormat(row.original.projectStartDate)}</div>
  },
  {
    accessorKey: 'projectEndDate',
    header: 'End date',
    cell: ({ row }) => <div>{dateFormat(row.original.projectEndDate)}</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
