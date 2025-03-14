import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { SaveIcon, Trash2Icon, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { DefaultValues, useForm } from 'react-hook-form'
import { Form } from '@app/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ConfirmDialog from '@app/components/ConfirmDialog'
import { useEffect, useState } from 'react'
import FormField from '@app/components/Form/FormField'
import { Input } from '@app/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useDeleteRoles from '@app/containers/Roles/hooks/useDeleteRoles'
import useCreateRole from '@app/containers/Roles/hooks/useCreateRole'
import { ROLE_LIST_ROUTE } from '@app/containers/Roles/constants/role-routes.constants'
import useGetRole from '@app/containers/Roles/hooks/useGetRole'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import { generateSelectOptions } from '@app/utils/generateSelectOptions'
import { Stage } from '@app/containers/Stages/types/stage.types'
import useUpdateRole from '@app/containers/Roles/hooks/useUpdateRole'
import { roleQueryKey } from '@app/containers/Roles/constants/role.query-key'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import Combobox from '@app/components/Combobox'
import { createRolePayloadSchema, roleSchema } from '@app/containers/Roles/constants/role.schemas'
import { createRecipePayloadSchema } from '@app/containers/Recipe/constants/recipe.schemas'

const defaultValues: DefaultValues<z.infer<typeof roleSchema>> = {
  roleCode: '',
  roleName: '',
  description: '',
  privileges: []
}

const RoleDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteRoles, isPending: isDeletingRoles } = useDeleteRoles()
  const { mutate: mutateCreateRole, isPending: isCreatingRole } = useCreateRole()
  const { mutate: mutateUpdateRole, isPending: isUpdatingRole } = useUpdateRole()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createRolePayloadSchema>) => {
    if (isEdit) {
      mutateUpdateRole(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update role ${role?.data.roleName} successfully`)
            await queryClient.invalidateQueries({ queryKey: [roleQueryKey.getRole(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [roleQueryKey.getAllRoles()[0]] })
          }
        }
      )
    } else {
      mutateCreateRole(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create role successfully`)
            router.push(ROLE_LIST_ROUTE)
            await queryClient.invalidateQueries({ queryKey: [roleQueryKey.getAllRoles()[0]] })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteRoles(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete role ${role?.data.roleName} successfully`)
          router.push(ROLE_LIST_ROUTE)
          await queryClient.invalidateQueries({ queryKey: [roleQueryKey.getAllRoles()[0]] })
        }
      }
    )
  }

  const { data: role, isLoading: isGettingRole } = useGetRole({ id: id as string })
  const { data: stages, isLoading: isGettingStages } = useGetStages()
  const stageOptions = generateSelectOptions({ data: stages?.data, labelKey: 'code', valueKey: 'id' })

  useEffect(() => {
    if (role?.data) {
      const { roleName, roleCode, id, privileges, description } = role.data

      reset({
        roleName,
        roleCode,
        id,
        privileges,
        description
      })
    }
  }, [role, isEdit, stages])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingRole} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit Role ${role?.data.roleCode}` : 'Create Role'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 w-1/4'>
            <FormField
              control={form.control}
              name='roleCode'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Role code' {...field} />}
            />
            <FormField
              control={form.control}
              name='roleName'
              label={'Name'}
              renderComponent={({ field }) => <Input placeholder='Role name' {...field} />}
            />
            <FormField
              control={form.control}
              name='description'
              label={'Description'}
              renderComponent={({ field }) => <Input placeholder='Role description' {...field} />}
            />
            <FormField
              control={form.control}
              name='privileges'
              label={'Name'}
              renderComponent={({ field }) => (
                <Combobox
                  onValueChange={field.onChange}
                  value={field.value}
                  options={stageOptions}
                  name={'stage'}
                  placeholder={'Select stage'}
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
                isLoading={isCreatingRole || isDeletingRoles || isUpdatingRole}
                onClick={() => setOpenDialogDelete(true)}
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button isLoading={isCreatingRole || isDeletingRoles || isUpdatingRole} type='submit'>
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

export default RoleDetail
