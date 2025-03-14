import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getDepartmentListColumns } from '@app/containers/Departments/constants/department-list.columns'
import {
  DEPARTMENT_DETAIL_CREATE_ROUTE,
  DEPARTMENT_DETAIL_EDIT_ROUTE
} from '@app/containers/Departments/constants/department-routes.constants'
import { Department } from '@app/containers/Departments/types/department.types'
import useDeleteDepartments from '@app/containers/Departments/hooks/useDeleteDepartments'
import useGetDepartments from '@app/containers/Departments/hooks/useGetDepartments'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { departmentQueryKey } from '@app/containers/Departments/constants/department.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const DepartmentGroupList = () => {
  const { handlePaginationChange, pageSize, page, sort } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteDepartments } = useDeleteDepartments()
  const queryClient = useQueryClient()

  const handleDelete = (department: Department) => {
    mutateDeleteDepartments(
      {
        id: [department.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete employee group ${department.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === departmentQueryKey.getAllDepartments()[0]
          })
        }
      }
    )
  }
  const handleEdit = (department: Department) => {
    router.push(`${DEPARTMENT_DETAIL_EDIT_ROUTE(department.id)}`)
  }

  const { data: departments, isLoading: isGettingDepartments } = useGetDepartments({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingDepartments} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Departments' totalItems={departments?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${DEPARTMENT_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add department
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getDepartmentListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={departments?.data || []}
          totalRecords={departments?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default DepartmentGroupList
