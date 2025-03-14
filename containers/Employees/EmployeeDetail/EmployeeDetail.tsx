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
import useDeleteEmployees from '@app/containers/Employees/hooks/useDeleteEmployees'
import useCreateEmployee from '@app/containers/Employees/hooks/useCreateEmployee'
import { EMPLOYEE_LIST_ROUTE } from '@app/containers/Employees/constants/employee-routes.constants'
import useGetEmployee from '@app/containers/Employees/hooks/useGetEmployee'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useUpdateEmployee from '@app/containers/Employees/hooks/useUpdateEmployee'
import { employeeQueryKey } from '@app/containers/Employees/constants/employee.query-key'
import useGetDepartments from '@app/containers/Departments/hooks/useGetDepartments'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import useGetEmployeeGroups from '@app/containers/EmployeeGroups/hooks/useGetEmployeeGroups'
import useGetPositions from '@app/containers/Positions/hooks/useGetPositions'
import { createEmployeePayloadSchema } from '@app/containers/Employees/constants/employee.schemas'
import Combobox from '@app/components/Combobox'

const defaultValues: DefaultValues<z.infer<typeof createEmployeePayloadSchema>> = {
  code: '',
  name: '',
  dept: undefined,
  group: undefined,
  position: undefined
}

const EmployeeDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createEmployeePayloadSchema>>({
    resolver: zodResolver(createEmployeePayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteEmployees, isPending: isDeletingEmployees } = useDeleteEmployees()
  const { mutate: mutateCreateEmployee, isPending: isCreatingEmployee } = useCreateEmployee()
  const { mutate: mutateUpdateEmployee, isPending: isUpdatingEmployee } = useUpdateEmployee()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createEmployeePayloadSchema>) => {
    if (isEdit) {
      mutateUpdateEmployee(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update employee ${employee?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [employeeQueryKey.getEmployee(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [employeeQueryKey.getAllEmployees()[0]] })
          }
        }
      )
    } else {
      mutateCreateEmployee(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create employee successfully`)
            router.push(EMPLOYEE_LIST_ROUTE)
            await queryClient.invalidateQueries({
              queryKey: [employeeQueryKey.getAllEmployees()[0]]
            })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteEmployees(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete employee ${employee?.data.code} successfully`)
          router.push(EMPLOYEE_LIST_ROUTE)
          await queryClient.invalidateQueries({
            queryKey: [employeeQueryKey.getAllEmployees()[0]]
          })
        }
      }
    )
  }

  const { data: employee, isLoading: isGettingEmployee } = useGetEmployee({ id: id as string })
  const { data: departments, isLoading: isGettingDepartments } = useGetDepartments()
  const departmentOptions = generateMultiSelectOptions({
    data: departments?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })
  const { data: employeeGroups, isLoading: isGettingEmployeeGroups } = useGetEmployeeGroups()
  const employeeGroupsOptions = generateMultiSelectOptions({
    data: employeeGroups?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })
  const { data: positions, isLoading: isGettingPostions } = useGetPositions()
  const positionOptions = generateMultiSelectOptions({
    data: positions?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (employee?.data) {
      const { code, dept, name, position, group } = employee.data

      reset({
        name,
        code,
        dept,
        position,
        group
      })
    }
  }, [employee, isEdit, departments])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingEmployee || isGettingDepartments} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit employee ${employee?.data.code}` : 'Create employee'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Employee code' {...field} />}
            />
            <FormField
              control={form.control}
              name='name'
              label={'Employee name'}
              renderComponent={({ field }) => <Input placeholder='Employee name' {...field} />}
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
              name='group'
              label={'Group'}
              renderComponent={({ field }) => (
                <Combobox
                  {...field}
                  onValueChange={field.onChange}
                  options={employeeGroupsOptions}
                  placeholder={'Select group'}
                  valueKey={'id'}
                />
              )}
            />
            <FormField
              control={form.control}
              name='position'
              label={'Position'}
              renderComponent={({ field }) => (
                <Combobox
                  {...field}
                  onValueChange={field.onChange}
                  options={positionOptions}
                  placeholder={'Select position'}
                  valueKey={'id'}
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
                isLoading={isCreatingEmployee || isDeletingEmployees || isUpdatingEmployee}
                onClick={() => setOpenDialogDelete(true)}
                type='button'
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingEmployee || isDeletingEmployees || isUpdatingEmployee}
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

export default EmployeeDetail
