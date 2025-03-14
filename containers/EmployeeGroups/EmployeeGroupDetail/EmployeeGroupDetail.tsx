import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { SaveIcon, Trash2Icon } from 'lucide-react'
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
import useDeleteEmployeeGroups from '@app/containers/EmployeeGroups/hooks/useDeleteEmployeeGroups'
import useCreateEmployeeGroup from '@app/containers/EmployeeGroups/hooks/useCreateEmployeeGroup'
import { EMPLOYEE_GROUP_LIST_ROUTE } from '@app/containers/EmployeeGroups/constants/employee-group-routes.constants'
import useGetEmployeeGroup from '@app/containers/EmployeeGroups/hooks/useGetEmployeeGroup'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useUpdateEmployeeGroup from '@app/containers/EmployeeGroups/hooks/useUpdateEmployeeGroup'
import { employeeGroupQueryKey } from '@app/containers/EmployeeGroups/constants/employee-group.query-key'
import useGetDepartments from '@app/containers/Departments/hooks/useGetDepartments'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import { createEmployeeGroupPayloadSchema } from '@app/containers/EmployeeGroups/constants/employee-group.schemas'
import useGetEmployees from '@app/containers/Employees/hooks/useGetEmployees'
import MultiSelectHook from '@app/components/Form/MultiSelectHook/MultiSelectHook'
import { BaseEmployee } from '@app/containers/Employees/types/employee.types'
import Combobox from '@app/components/Combobox'

const defaultValues: DefaultValues<z.infer<typeof createEmployeeGroupPayloadSchema>> = {
  code: '',
  name: '',
  dept: undefined,
  employees: []
}

const EmployeeGroupDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createEmployeeGroupPayloadSchema>>({
    resolver: zodResolver(createEmployeeGroupPayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteEmployeeGroups, isPending: isDeletingEmployeeGroups } = useDeleteEmployeeGroups()
  const { mutate: mutateCreateEmployeeGroup, isPending: isCreatingEmployeeGroup } = useCreateEmployeeGroup()
  const { mutate: mutateUpdateEmployeeGroup, isPending: isUpdatingEmployeeGroup } = useUpdateEmployeeGroup()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createEmployeeGroupPayloadSchema>) => {
    if (isEdit) {
      mutateUpdateEmployeeGroup(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update employee group ${employeeGroup?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [employeeGroupQueryKey.getEmployeeGroup(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [employeeGroupQueryKey.getAllEmployeeGroups()[0]] })
          }
        }
      )
    } else {
      mutateCreateEmployeeGroup(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create employee group successfully`)
            router.push(EMPLOYEE_GROUP_LIST_ROUTE)
            await queryClient.invalidateQueries({
              queryKey: [employeeGroupQueryKey.getAllEmployeeGroups()[0]]
            })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteEmployeeGroups(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete employee group ${employeeGroup?.data.code} successfully`)
          router.push(EMPLOYEE_GROUP_LIST_ROUTE)
          await queryClient.invalidateQueries({
            queryKey: [employeeGroupQueryKey.getAllEmployeeGroups()[0]]
          })
        }
      }
    )
  }

  const { data: employeeGroup, isLoading: isGettingEmployeeGroup } = useGetEmployeeGroup({ id: id as string })
  const { data: departments, isLoading: isGettingDepartments } = useGetDepartments()
  const departmentOptions = generateMultiSelectOptions({
    data: departments?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })
  const { data: employees, isLoading: isGettingEmployees } = useGetEmployees()
  const employeesOptions = generateMultiSelectOptions<BaseEmployee>({
    data: employees?.data.map(
      (employee) =>
        ({
          id: employee.id,
          code: employee.code,
          name: employee.name
        }) as BaseEmployee
    ),
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (employeeGroup?.data) {
      const { code, dept, name, employees } = employeeGroup.data

      reset({
        name,
        code,
        dept,
        employees
      })
    }
  }, [employeeGroup, isEdit, employees])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingEmployeeGroup || isGettingEmployees || isGettingEmployees} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>
              {isEdit ? `Edit employee group ${employeeGroup?.data.code}` : 'Create employee group'}
            </Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Employee group code' {...field} />}
            />
            <FormField
              control={form.control}
              name='name'
              label={'Employee Group name'}
              renderComponent={({ field }) => <Input placeholder='Employee group name' {...field} />}
            />
            <FormField
              control={form.control}
              name='dept'
              label={'Department'}
              renderComponent={({ field }) => (
                <Combobox
                  onValueChange={field.onChange}
                  value={field.value}
                  options={departmentOptions}
                  name={'dept'}
                  placeholder={'Select department'}
                  valueKey={'id'}
                />
              )}
            />
            <FormField
              control={form.control}
              name='employees'
              label={'Employees'}
              renderComponent={({ field }) => (
                <MultiSelectHook<BaseEmployee> {...field} options={employeesOptions} filterByKey={'id'} />
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
                isLoading={isCreatingEmployeeGroup || isDeletingEmployeeGroups || isUpdatingEmployeeGroup}
                onClick={() => setOpenDialogDelete(true)}
                type='button'
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingEmployeeGroup || isDeletingEmployeeGroups || isUpdatingEmployeeGroup}
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

export default EmployeeGroupDetail
