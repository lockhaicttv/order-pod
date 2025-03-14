import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getRoleListColumns } from '@app/containers/Roles/constants/role-list.columns'
import { ROLE_DETAIL_CREATE_ROUTE, ROLE_DETAIL_EDIT_ROUTE } from '@app/containers/Roles/constants/role-routes.constants'
import { Role } from '@app/containers/Roles/types/role.types'
import useDeleteRoles from '@app/containers/Roles/hooks/useDeleteRoles'
import useGetRoles from '@app/containers/Roles/hooks/useGetRoles'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { roleQueryKey } from '@app/containers/Roles/constants/role.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const RoleList = () => {
  const { handlePaginationChange, pageSize, page } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteRoles } = useDeleteRoles()
  const queryClient = useQueryClient()

  const handleDelete = (role: Role) => {
    mutateDeleteRoles(
      {
        id: [role.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete role ${role.roleName} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === roleQueryKey.getAllRoles()[0]
          })
        }
      }
    )
  }
  const handleEdit = (role: Role) => {
    router.push(`${ROLE_DETAIL_EDIT_ROUTE(role.id)}`)
  }

  const { data: roles, isLoading: isGettingRoles } = useGetRoles({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingRoles} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Roles' totalItems={roles?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${ROLE_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Role
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getRoleListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={roles?.data || []}
          totalRecords={roles?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default RoleList
