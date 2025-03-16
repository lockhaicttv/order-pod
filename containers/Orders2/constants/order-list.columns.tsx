import { ColumnDef, Row } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Order, Status, UpdateOrderStatusPayload } from '@app/containers/Orders2/types/order.types'
import { dateFormat } from '@app/utils/formatDate'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@app/components/ui/table'
import Image from 'next/image'
import { ChevronDownIcon, ChevronRightIcon, ImageIcon, MapPinIcon, PhoneIcon, UserIcon } from 'lucide-react'
import { Button } from '@app/components/ui/button'
import InfoWithIcon from '@app/components/InfoWithIcon'
import StatusTag from '@app/components/StatusTag'
import React, { useState } from 'react'
import useUpdateDepartment from '@app/containers/Departments/hooks/useUpdateDepartment'
import useUpdateOrderStatus from '@app/containers/Orders2/hooks/useUpdateOrderStatus'
import { toast } from 'react-toastify'
import Select from '@app/components/Select'
import { capitalize } from 'lodash'
import useStore from '@app/store/useStore'

interface OrderListColumns {
  onEdit: (order: Order) => void
  onDelete: (order: Order) => void
}
export const getOrderListColumns = ({ onEdit, onDelete }: OrderListColumns): ColumnDef<Order>[] => [
  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  //   enableHiding: true
  // },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => (
      <div
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          paddingLeft: `${row.depth * 2}rem`
        }}
      >
        <Button onClick={row.getToggleExpandedHandler()} size='icon' variant='ghost'>
          {row.getIsExpanded() ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />}
        </Button>
      </div>
    )
  },
  {
    accessorKey: 'agencyOrderCode',
    header: 'Order Code'
  },
  {
    accessorKey: 'agency.displayName',
    header: 'Agency'
  },
  {
    accessorKey: 'totalQuantity',
    header: 'Total Quantity'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <RenderStatus row={row} />
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
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
  //   size: 50
  // }
]

const statusOption = Object.values(Status).map((status) => ({
  value: status,
  label: capitalize(status)
}))

const RenderStatus = ({ row }: { row: Row<Order> }) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const { isAgency } = useStore()
  const { mutate: mutateUpdateOrderStatus, isPending: isUpdatingOrderStatus } = useUpdateOrderStatus()
  const [status, setStatus] = useState(row.original.status)

  const handleUpdateOrderStatus = (updateOrderStatusPayload: UpdateOrderStatusPayload) => {
    mutateUpdateOrderStatus(updateOrderStatusPayload, {
      onSuccess: () => {
        setIsUpdatingStatus(false)
        setStatus(updateOrderStatusPayload.status)
        toast.success('Update order status successfully!')
      }
    })
  }

  return (
    <div className='w-[100px]'>
      {isUpdatingStatus ? (
        <Select
          name='status'
          value={status}
          onValueChange={(status) => handleUpdateOrderStatus({ orderId: row.original.id, status })}
          options={statusOption}
        />
      ) : (
        <div
          className='p-0 h-auto hover:cursor-pointer'
          onClick={() => {
            !isAgency && setIsUpdatingStatus(true)
          }}
        >
          <StatusTag status={status} />
        </div>
      )}
    </div>
  )
}

export const RenderDetail = ({ row }: { row: Row<Order> }) => {
  const { customerName, customerAddress1, city, zip, phone, country } = row.original

  return (
    <pre style={{ fontSize: '10px' }}>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col tablet:flex-row gap-4'>
          <InfoWithIcon icon={<UserIcon size={20} />} info={customerName} title={customerName} />
          <InfoWithIcon
            icon={<MapPinIcon size={20} />}
            info={[customerAddress1 || '', zip || '', city || '', country || ''].join(',')}
            title={[customerAddress1 || '', zip || '', city || '', country || ''].join(',')}
          />
          <InfoWithIcon icon={<PhoneIcon size={18} />} info={phone} title={phone || ''} />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Front Design</TableHead>
            <TableHead>Back Design</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {row.original.detail.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.product.category}</TableCell>
              <TableCell>{order.product.type}</TableCell>
              <TableCell>{order.product.color}</TableCell>
              <TableCell>{order.product.size}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>
                {order.frontDesign ? (
                  <div className='relative h-[50px] w-[50px]'>
                    <img
                      src={order.frontDesign}
                      style={{
                        height: '50px',
                        width: '50px'
                      }}
                      alt='front-design'
                    />
                  </div>
                ) : (
                  <ImageIcon size={40} />
                )}
              </TableCell>
              <TableCell>
                {order.backDesign ? (
                  <div className='relative h-[50px] w-[50px]'>
                    <img
                      src={order.backDesign}
                      style={{
                        height: '50px',
                        width: '50px'
                      }}
                      alt='back-design'
                    />
                  </div>
                ) : (
                  <ImageIcon size={40} />
                )}
              </TableCell>
              <TableCell>{order?.note || '---'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </pre>
  )
}
