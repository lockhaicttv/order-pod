import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useGetProcesses from '@app/containers/Processes/hooks/useGetProcesses'
import useDeleteProcesses from '@app/containers/Processes/hooks/useDeleteProcesses'
import { Process } from '@app/containers/Processes/types/process-type.types'
import {
  PROCESS_DETAIL_CREATE_ROUTE,
  PROCESS_DETAIL_EDIT_ROUTE
} from '@app/containers/Processes/constants/process-routes.constants'
import { getProcessListColumns } from '@app/containers/Processes/constants/process-list.columns'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { processQueryKey } from '@app/containers/Processes/constants/process.query-key'

const ProcessList = () => {
  const { handlePaginationChange, pageSize, page } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteProcesses } = useDeleteProcesses()
  const queryClient = useQueryClient()

  const handleDelete = (process: Process) => {
    mutateDeleteProcesses(
      {
        id: [process.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete process ${process.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === processQueryKey.getAllProcesses()[0]
          })
        }
      }
    )
  }
  const handleEdit = (process: Process) => {
    router.push(`${PROCESS_DETAIL_EDIT_ROUTE(process.id)}`)
  }

  const { data: processes, isLoading: isGettingProcess } = useGetProcesses({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingProcess} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Processes' totalItems={processes?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${PROCESS_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Process
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getProcessListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={processes?.data || []}
          totalRecords={processes?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default ProcessList
