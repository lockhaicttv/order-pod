import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getUserListColumns } from '@app/containers/Users/constants/user.columns'
import { USER_DETAIL_CREATE_ROUTE, USER_DETAIL_EDIT_ROUTE } from '@app/containers/Users/constants/user-routes.constants'
import { User } from '@app/containers/Users/types/user.types'
import useDeleteUsers from '@app/containers/Users/hooks/useDeleteUsers'
import useGetUsers from '@app/containers/Users/hooks/useGetUsers'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { userQueryKey } from '@app/containers/Users/constants/user.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const UserGroupList = () => {
  const { handlePaginationChange, pageSize, page, sort } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteUsers } = useDeleteUsers()
  const queryClient = useQueryClient()

  const handleDelete = (user: User) => {
    mutateDeleteUsers(
      {
        id: [user.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete user ${user.id} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === userQueryKey.getAllUsers()[0]
          })
        }
      }
    )
  }
  const handleEdit = (user: User) => {
    router.push(`${USER_DETAIL_EDIT_ROUTE(user.id)}`)
  }

  const { data: users, isLoading: isGettingUsers } = useGetUsers({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingUsers} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Users' totalItems={users?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${USER_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add User
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getUserListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={users?.data || []}
          totalRecords={users?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default UserGroupList
