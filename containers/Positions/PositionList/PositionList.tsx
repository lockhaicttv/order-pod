import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getPositionListColumns } from '@app/containers/Positions/constants/position.columns'
import {
  POSITION_DETAIL_CREATE_ROUTE,
  POSITION_DETAIL_EDIT_ROUTE
} from '@app/containers/Positions/constants/position-routes.constants'
import { Position } from '@app/containers/Positions/types/position.types'
import useDeletePositions from '@app/containers/Positions/hooks/useDeletePositions'
import useGetPositions from '@app/containers/Positions/hooks/useGetPositions'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { positionQueryKey } from '@app/containers/Positions/constants/position.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const PositionGroupList = () => {
  const { handlePaginationChange, pageSize, page, sort } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeletePositions } = useDeletePositions()
  const queryClient = useQueryClient()

  const handleDelete = (position: Position) => {
    mutateDeletePositions(
      {
        id: [position.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete position ${position.id} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === positionQueryKey.getAllPositions()[0]
          })
        }
      }
    )
  }
  const handleEdit = (position: Position) => {
    router.push(`${POSITION_DETAIL_EDIT_ROUTE(position.id)}`)
  }

  const { data: positions, isLoading: isGettingPositions } = useGetPositions({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingPositions} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Positions' totalItems={positions?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${POSITION_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Position
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getPositionListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={positions?.data || []}
          totalRecords={positions?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default PositionGroupList
