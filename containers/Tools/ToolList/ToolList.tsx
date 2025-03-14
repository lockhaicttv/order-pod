import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getToolListColumns } from '@app/containers/Tools/constants/tool-list.columns'
import { TOOL_DETAIL_CREATE_ROUTE, TOOL_DETAIL_EDIT_ROUTE } from '@app/containers/Tools/constants/tool-routes.constants'
import { Tool } from '@app/containers/Tools/types/tool.types'
import useDeleteTools from '@app/containers/Tools/hooks/useDeleteTools'
import useGetTools from '@app/containers/Tools/hooks/useGetTools'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { toolQueryKey } from '@app/containers/Tools/constants/tool.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const ToolGroupList = () => {
  const { handlePaginationChange, pageSize, page, sort } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteTools } = useDeleteTools()
  const queryClient = useQueryClient()

  const handleDelete = (tool: Tool) => {
    mutateDeleteTools(
      {
        id: [tool.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete tool ${tool.id} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === toolQueryKey.getAllTools()[0]
          })
        }
      }
    )
  }
  const handleEdit = (tool: Tool) => {
    router.push(`${TOOL_DETAIL_EDIT_ROUTE(tool.id)}`)
  }

  const { data: tools, isLoading: isGettingTools } = useGetTools({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingTools} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Tools' totalItems={tools?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${TOOL_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Tool
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getToolListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={tools?.data || []}
          totalRecords={tools?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default ToolGroupList
