import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { SaveIcon, Trash2Icon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { DefaultValues, useForm } from 'react-hook-form'
import { Form } from '@app/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ConfirmDialog from '@app/components/ConfirmDialog'
import React, { useEffect, useState } from 'react'
import FormField from '@app/components/Form/FormField'
import { Input } from '@app/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useDeleteUsers from '@app/containers/Users/hooks/useDeleteUsers'
import useCreateUser from '@app/containers/Users/hooks/useCreateUser'
import { USER_LIST_ROUTE } from '@app/containers/Users/constants/user-routes.constants'
import useGetUser from '@app/containers/Users/hooks/useGetUser'
import useUpdateUser from '@app/containers/Users/hooks/useUpdateUser'
import { userQueryKey } from '@app/containers/Users/constants/user.query-key'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import { createUserPayloadSchema } from '@app/containers/Users/constants/user.schemas'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useGetRoles from '@app/containers/Roles/hooks/useGetRoles'
import MultiSelectHook from '@app/components/Form/MultiSelectHook/MultiSelectHook'
import { Role } from '@app/containers/Roles/types/role.types'

const defaultValues: DefaultValues<z.infer<typeof createUserPayloadSchema>> = {
  name: '',
  roles: [],
  displayName: '',
  password: '',
  status: 0,
  userName: ''
}

const UserGroupDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createUserPayloadSchema>>({
    resolver: zodResolver(createUserPayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteUsers, isPending: isDeletingUsers } = useDeleteUsers()
  const { mutate: mutateCreateUser, isPending: isCreatingUser } = useCreateUser()
  const { mutate: mutateUpdateUser, isPending: isUpdatingUser } = useUpdateUser()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createUserPayloadSchema>) => {
    if (isEdit) {
      mutateUpdateUser(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update user ${user?.data.id} successfully`)
            await queryClient.invalidateQueries({ queryKey: [userQueryKey.getUser(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [userQueryKey.getAllUsers()[0]] })
          }
        }
      )
    } else {
      mutateCreateUser(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create user successfully`)
            router.push(USER_LIST_ROUTE)
            await queryClient.invalidateQueries({
              queryKey: [userQueryKey.getAllUsers()[0]]
            })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteUsers(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete user ${user?.data.id} successfully`)
          router.push(USER_LIST_ROUTE)
          await queryClient.invalidateQueries({
            queryKey: [userQueryKey.getAllUsers()[0]]
          })
        }
      }
    )
  }

  const { data: roles, isLoading: isGettingRoles } = useGetRoles()

  const rolesOptions = generateMultiSelectOptions({
    data: roles?.data || [],
    labelKey: 'roleName',
    valueKey: 'roleCode',
    valueAsObject: true
  })

  const { data: user, isLoading: isGettingUser } = useGetUser({ id: id as string })

  useEffect(() => {
    if (user?.data) {
      const { name } = user.data

      reset({ name })
    }
  }, [user, isEdit])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingUser} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit User ${user?.data.id}` : 'Create User'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 w-1/4'>
            <FormField
              control={form.control}
              name='userName'
              label={'User name'}
              renderComponent={({ field }) => <Input placeholder='User name' {...field} />}
            />
            <FormField
              control={form.control}
              name='displayName'
              label={'User name'}
              renderComponent={({ field }) => <Input placeholder='Display name' {...field} />}
            />
            <FormField
              control={form.control}
              name='password'
              label={'Password'}
              renderComponent={({ field }) => <Input placeholder='Password' {...field} />}
            />
            <FormField
              control={form.control}
              name='roles'
              label={'Roles'}
              renderComponent={({ field }) => (
                <MultiSelectHook<Role>
                  value={field.value}
                  onChange={field.onChange}
                  options={rolesOptions}
                  filterByKey={'roleCode'}
                />
              )}
            />
          </div>
        </PageContent>
        <PageFooter>
          <div className='flex gap-4'>
            {isEdit && (
              <Button
                variant='destructive'
                color='red'
                isLoading={isCreatingUser || isDeletingUsers || isUpdatingUser}
                onClick={() => setOpenDialogDelete(true)}
                type='button'
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingUser || isDeletingUsers || isUpdatingUser}
              disabled={!form.formState.isDirty}
              type='submit'
            >
              <SaveIcon className='mr-2' />
              SAVE
            </Button>
          </div>
        </PageFooter>
        <ConfirmDialog
          open={openDialogDelete}
          onClose={() => setOpenDialogDelete(false)}
          onConfirm={() => handleDelete()}
          onReject={() => setOpenDialogDelete(false)}
          dialogTitle={'Delete Items'}
          confirmMessage='Do you want delete this items ?'
        />
      </form>
    </Form>
  )
}

export default UserGroupDetail
