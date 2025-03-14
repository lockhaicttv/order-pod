import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getEmployeeGroupListColumns } from '@app/containers/EmployeeGroups/constants/employee-group-list.columns'
import {
  EMPLOYEE_GROUP_DETAIL_CREATE_ROUTE,
  EMPLOYEE_GROUP_DETAIL_EDIT_ROUTE
} from '@app/containers/EmployeeGroups/constants/employee-group-routes.constants'
import { EmployeeGroup } from '@app/containers/EmployeeGroups/types/employee-group.types'
import useDeleteEmployeeGroups from '@app/containers/EmployeeGroups/hooks/useDeleteEmployeeGroups'
import useGetEmployeeGroups from '@app/containers/EmployeeGroups/hooks/useGetEmployeeGroups'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { employeeGroupQueryKey } from '@app/containers/EmployeeGroups/constants/employee-group.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const EmployeeGroupGroupList = () => {
  const { handlePaginationChange, pageSize, page, sort } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteEmployeeGroups } = useDeleteEmployeeGroups()
  const queryClient = useQueryClient()

  const handleDelete = (employeeGroup: EmployeeGroup) => {
    mutateDeleteEmployeeGroups(
      {
        id: [employeeGroup.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete employee group ${employeeGroup.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === employeeGroupQueryKey.getAllEmployeeGroups()[0]
          })
        }
      }
    )
  }
  const handleEdit = (employeeGroup: EmployeeGroup) => {
    router.push(`${EMPLOYEE_GROUP_DETAIL_EDIT_ROUTE(employeeGroup.id)}`)
  }

  const { data: employeeGroups, isLoading: isGettingEmployeeGroups } = useGetEmployeeGroups({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingEmployeeGroups} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Employee Groups' totalItems={employeeGroups?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${EMPLOYEE_GROUP_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Employee Group
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getEmployeeGroupListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={employeeGroups?.data || []}
          totalRecords={employeeGroups?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default EmployeeGroupGroupList
