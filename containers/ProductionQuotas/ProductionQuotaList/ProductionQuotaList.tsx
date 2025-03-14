import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useGetProductionQuotas from '@app/containers/ProductionQuotas/hooks/useGetProductionQuotas'
import useDeleteProductionQuotas from '@app/containers/ProductionQuotas/hooks/useDeleteProductionQuotas'
import { ProductionQuota } from '@app/containers/ProductionQuotas/types/production-quota-type.types'
import { getProductionQuotaListColumns } from '@app/containers/ProductionQuotas/constants/production-quota-list.columns'
import {
  PRODUCTION_QUOTA_DETAIL_CREATE_ROUTE,
  PRODUCTION_QUOTA_DETAIL_EDIT_ROUTE
} from '@app/containers/ProductionQuotas/constants/production-quota-routes.constants'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { productionQuotaQueryKey } from '@app/containers/ProductionQuotas/constants/production-quota.query-key'

const ProductionQuotaList = () => {
  const { handlePaginationChange, pageSize, page } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteProductionQuotas } = useDeleteProductionQuotas()
  const queryClient = useQueryClient()

  const handleDelete = (productionQuota: ProductionQuota) => {
    mutateDeleteProductionQuotas(
      {
        id: [productionQuota.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete production quota ${productionQuota.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === productionQuotaQueryKey.getAllProductionQuota()[0]
          })
        }
      }
    )
  }
  const handleEdit = (productionQuota: ProductionQuota) => {
    router.push(`${PRODUCTION_QUOTA_DETAIL_EDIT_ROUTE(productionQuota.id)}`)
  }

  const { data: productionQuotas, isLoading: isGettingProductionQuota } = useGetProductionQuotas({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingProductionQuota} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Production Quotas' totalItems={productionQuotas?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${PRODUCTION_QUOTA_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Production Quota
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getProductionQuotaListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={productionQuotas?.data || []}
          totalRecords={productionQuotas?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default ProductionQuotaList
