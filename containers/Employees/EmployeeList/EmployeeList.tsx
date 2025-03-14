import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getEmployeeListColumns } from '@app/containers/Employees/constants/employee-list.columns'
import {
  EMPLOYEE_DETAIL_CREATE_ROUTE,
  EMPLOYEE_DETAIL_EDIT_ROUTE
} from '@app/containers/Employees/constants/employee-routes.constants'
import { Employee } from '@app/containers/Employees/types/employee.types'
import useDeleteEmployees from '@app/containers/Employees/hooks/useDeleteEmployees'
import useGetEmployees from '@app/containers/Employees/hooks/useGetEmployees'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { employeeQueryKey } from '@app/containers/Employees/constants/employee.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast, useToast } from 'react-toastify'

const EmployeeList = () => {
  const { handlePaginationChange, pageSize, page, sort } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteEmployees } = useDeleteEmployees()
  const queryClient = useQueryClient()

  const handleDelete = (employee: Employee) => {
    mutateDeleteEmployees(
      {
        id: [employee.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete employee ${employee.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === employeeQueryKey.getAllEmployees()[0]
          })
        }
      }
    )
  }
  const handleEdit = (employee: Employee) => {
    router.push(`${EMPLOYEE_DETAIL_EDIT_ROUTE(employee.id)}`)
  }

  const { data: employees, isLoading: isGettingEmployees } = useGetEmployees({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingEmployees} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Employees' totalItems={employees?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${EMPLOYEE_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Employee
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getEmployeeListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={employees?.data || []}
          totalRecords={employees?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default EmployeeList
