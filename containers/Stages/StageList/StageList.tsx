import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getStageListColumns } from '@app/containers/Stages/constants/stage-list.columns'
import {
  STAGE_DETAIL_CREATE_ROUTE,
  STAGE_DETAIL_EDIT_ROUTE
} from '@app/containers/Stages/constants/stage-routes.constants'
import { Stage } from '@app/containers/Stages/types/stage.types'
import useDeleteStages from '@app/containers/Stages/hooks/useDeleteStages'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { stageQueryKey } from '@app/containers/Stages/constants/stage.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const StageList = () => {
  const { handlePaginationChange, pageSize, page } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteStages } = useDeleteStages()
  const queryClient = useQueryClient()

  const handleDelete = (stage: Stage) => {
    mutateDeleteStages(
      {
        id: [stage.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete stage ${stage.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === stageQueryKey.getAllStages()[0]
          })
        }
      }
    )
  }
  const handleEdit = (stage: Stage) => {
    router.push(`${STAGE_DETAIL_EDIT_ROUTE(stage.id)}`)
  }

  const { data: stages, isLoading: isGettingStages } = useGetStages({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingStages} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Stages' totalItems={stages?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${STAGE_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Stage
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getStageListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={stages?.data || []}
          totalRecords={stages?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default StageList
