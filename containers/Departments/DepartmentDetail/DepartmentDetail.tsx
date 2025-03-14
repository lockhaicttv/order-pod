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
import useDeleteDepartments from '@app/containers/Departments/hooks/useDeleteDepartments'
import useCreateDepartment from '@app/containers/Departments/hooks/useCreateDepartment'
import { DEPARTMENT_LIST_ROUTE } from '@app/containers/Departments/constants/department-routes.constants'
import useGetDepartment from '@app/containers/Departments/hooks/useGetDepartment'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useUpdateDepartment from '@app/containers/Departments/hooks/useUpdateDepartment'
import { departmentQueryKey } from '@app/containers/Departments/constants/department.query-key'
import useGetDepartments from '@app/containers/Departments/hooks/useGetDepartments'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import { createDepartmentPayloadSchema } from '@app/containers/Departments/constants/department.schemas'
import useGetEmployees from '@app/containers/Employees/hooks/useGetEmployees'
import { BaseEmployee } from '@app/containers/Employees/types/employee.types'
import NumberInput from '@app/components/NumberInput'

const defaultValues: DefaultValues<z.infer<typeof createDepartmentPayloadSchema>> = {
  code: '',
  name: '',
  shiftPerDay: 0
}

const DepartmentDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createDepartmentPayloadSchema>>({
    resolver: zodResolver(createDepartmentPayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteDepartments, isPending: isDeletingDepartments } = useDeleteDepartments()
  const { mutate: mutateCreateDepartment, isPending: isCreatingDepartment } = useCreateDepartment()
  const { mutate: mutateUpdateDepartment, isPending: isUpdatingDepartment } = useUpdateDepartment()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createDepartmentPayloadSchema>) => {
    if (isEdit) {
      mutateUpdateDepartment(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update employee group ${department?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [departmentQueryKey.getDepartment(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [departmentQueryKey.getAllDepartments()[0]] })
          }
        }
      )
    } else {
      mutateCreateDepartment(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create employee group successfully`)
            router.push(DEPARTMENT_LIST_ROUTE)
            await queryClient.invalidateQueries({
              queryKey: [departmentQueryKey.getAllDepartments()[0]]
            })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteDepartments(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete employee group ${department?.data.code} successfully`)
          router.push(DEPARTMENT_LIST_ROUTE)
          await queryClient.invalidateQueries({
            queryKey: [departmentQueryKey.getAllDepartments()[0]]
          })
        }
      }
    )
  }

  const { data: department, isLoading: isGettingDepartment } = useGetDepartment({ id: id as string })
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
    if (department?.data) {
      const { code, name, shiftPerDay } = department.data

      reset({
        name,
        code,
        shiftPerDay
      })
    }
  }, [department, isEdit, employees])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingDepartment || isGettingEmployees || isGettingEmployees} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>
              {isEdit ? `Edit department ${department?.data.code}` : 'Create department'}
            </Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 w-full tablet:w-1/2 desktop:w-1/4'>
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Input department code' {...field} />}
            />
            <FormField
              control={form.control}
              name='name'
              label={'Department name'}
              renderComponent={({ field }) => <Input placeholder='Input department name' {...field} />}
            />
            <FormField
              control={form.control}
              name='shiftPerDay'
              label={'Shift per day'}
              renderComponent={({ field }) => <NumberInput placeholder='Input shift per day' {...field} />}
            />
          </div>
        </PageContent>
        <PageFooter>
          <div className='flex gap-4'>
            {isEdit && (
              <Button
                variant='destructive'
                color='red'
                isLoading={isCreatingDepartment || isDeletingDepartments || isUpdatingDepartment}
                onClick={() => setOpenDialogDelete(true)}
                type='button'
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingDepartment || isDeletingDepartments || isUpdatingDepartment}
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

export default DepartmentDetail
