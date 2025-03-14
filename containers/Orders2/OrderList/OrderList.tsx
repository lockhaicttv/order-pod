import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getOrderListColumns } from '@app/containers/Orders2/constants/order-list.columns'
import {
  ORDER_DETAIL_CREATE_ROUTE,
  ORDER_DETAIL_EDIT_ROUTE
} from '@app/containers/Orders2/constants/order-routes.constants'
import { Order } from '@app/containers/Orders2/types/order.types'
import useDeleteOrders from '@app/containers/Orders2/hooks/useDeleteOrders'
import useGetOrders from '@app/containers/Orders2/hooks/useGetOrders'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { orderQueryKey } from '@app/containers/Orders2/constants/order.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DownloadIcon } from 'lucide-react'

const OrderList = () => {
  const { handlePaginationChange, pageSize, page } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteOrders } = useDeleteOrders()
  const queryClient = useQueryClient()

  const handleDelete = (order: Order) => {
    mutateDeleteOrders(
      {
        id: [order?.id || '']
      },
      {
        onSuccess: async () => {
          toast.success(`Delete order ${order.agencyOrderCode} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === orderQueryKey.getAllOrders()[0]
          })
        }
      }
    )
  }

  const handleEdit = (order: Order) => {
    router.push(`${ORDER_DETAIL_EDIT_ROUTE(order?.id || '')}`)
  }

  const { data: orders, isLoading: isGettingOrders } = useGetOrders({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingOrders} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Orders' totalItems={orders?.meta.count || 0} />
        {/*<Button*/}
        {/*  className='flex gap-2'*/}
        {/*  onClick={() => {*/}
        {/*    router.push(`${ORDER_DETAIL_CREATE_ROUTE}`)*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <PlusIcon />*/}
        {/*  Add Order*/}
        {/*</Button>*/}
        <Button className='flex gap-2' onClick={() => console.log('export')}>
          <DownloadIcon />
          Export
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getOrderListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={orders?.data || []}
          totalRecords={orders?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default OrderList
