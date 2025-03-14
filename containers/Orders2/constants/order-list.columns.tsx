import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Order } from '@app/containers/Orders2/types/order.types'
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
    accessorKey: 'agencyOrderCode',
    header: 'Order Code'
  },
  {
    accessorKey: 'agency.name',
    header: 'Agency'
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name'
  },
  {
    accessorKey: 'customerAddress1',
    header: 'Customer Address',
    cell: ({ row }) => <div>{`${row.original.customerAddress1} ${row.original.customerAddress2 || ''}`.trim()}</div>
  },
  {
    accessorKey: 'city',
    header: 'City'
  },
  {
    accessorKey: 'country',
    header: 'Country'
  },
  {
    accessorKey: 'totalQuantity',
    header: 'Total Quantity'
  },
  {
    accessorKey: 'orderDate',
    header: 'Order Date',
    cell: ({ row }) => <div>{dateFormat(row.original.orderDate)}</div>
  },
  {
    accessorKey: 'deliveryDate',
    header: 'Delivery Date',
    cell: ({ row }) => <div>{dateFormat(row.original.deliveryDate)}</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
