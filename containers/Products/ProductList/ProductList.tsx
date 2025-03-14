import { DataTable } from '@app/components/Table'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { getProductListColumns } from '@app/containers/Products/constants/product-list.columns'
import TableHeader from '@app/components/Table/TableHeader'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { useRouter } from 'next/navigation'
import useTablePagination from '@app/hooks/useTablePagination'
import { Product } from '@app/containers/Products/types/product.types'
import {
  PRODUCT_DETAIL_CREATE_ROUTE,
  PRODUCT_DETAIL_EDIT_ROUTE,
  PRODUCT_LIST_ROUTE
} from '@app/containers/Products/constants/product-routes.constants'
import useDeleteProducts from '@app/containers/Products/hooks/useDeleteProducts'
import BackDrop from '@app/components/BackDrop/BackDrop'
import Page from '@app/components/Page/Page'
import { toast } from 'react-toastify'
import { productQueryKey } from '@app/containers/Products/constants/product.query-key'
import { useQueryClient } from '@tanstack/react-query'

const ProductList = () => {
  const router = useRouter()
  const { page, pageSize, handlePaginationChange } = useTablePagination()
  const { mutate: mutateDeleteProduct, isPending: isDeleteProductPending } = useDeleteProducts()
  const queryClient = useQueryClient()

  const handleDelete = (product: Product) => {
    mutateDeleteProduct(
      {
        id: [product?.id || '']
      },
      {
        onSuccess: async () => {
          toast.success(`Delete product successfully`)
          await queryClient.invalidateQueries({ queryKey: [productQueryKey.getAllProduct()[0]] })
        }
      }
    )
  }

  const handleEdit = (product: Product) => {
    router.push(`${PRODUCT_DETAIL_EDIT_ROUTE(product?.id || '')}`)
  }

  const { data: products, isLoading: isGettingProducts } = useGetProducts({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingProducts} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Products' totalItems={products?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${PRODUCT_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Product
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getProductListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={products?.data || []}
          totalRecords={products?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default ProductList
