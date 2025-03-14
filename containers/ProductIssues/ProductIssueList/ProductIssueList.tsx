import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getProductIssueListColumns } from '@app/containers/ProductIssues/constants/product-issue-list.columns'
import {
  PRODUCT_ISSUE_DETAIL_CREATE_ROUTE,
  PRODUCT_ISSUE_DETAIL_EDIT_ROUTE
} from '@app/containers/ProductIssues/constants/product-issue-routes.constants'
import { ProductIssue } from '@app/containers/ProductIssues/types/product-issue.types'
import useDeleteProductIssues from '@app/containers/ProductIssues/hooks/useDeleteProductIssues'
import useGetProductIssues from '@app/containers/ProductIssues/hooks/useGetProductIssues'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { productIssueQueryKey } from '@app/containers/ProductIssues/constants/product-issue.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const ProductIssueGroupList = () => {
  const { handlePaginationChange, pageSize, page, sort } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteProductIssues } = useDeleteProductIssues()
  const queryClient = useQueryClient()

  const handleDelete = (productIssue: ProductIssue) => {
    mutateDeleteProductIssues(
      {
        id: [productIssue?.id || '']
      },
      {
        onSuccess: async () => {
          toast.success(`Delete employee group ${productIssue.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === productIssueQueryKey.getAllProductIssues()[0]
          })
        }
      }
    )
  }
  const handleEdit = (productIssue: ProductIssue) => {
    router.push(`${PRODUCT_ISSUE_DETAIL_EDIT_ROUTE(productIssue?.id || '')}`)
  }

  const { data: productIssues, isLoading: isGettingProductIssues } = useGetProductIssues({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingProductIssues} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Product Issues' totalItems={productIssues?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${PRODUCT_ISSUE_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add issue
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getProductIssueListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={productIssues?.data || []}
          totalRecords={productIssues?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default ProductIssueGroupList
