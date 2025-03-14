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
import useDeleteStages from '@app/containers/Stages/hooks/useDeleteStages'
import useCreateStage from '@app/containers/Stages/hooks/useCreateStage'
import { STAGE_LIST_ROUTE } from '@app/containers/Stages/constants/stage-routes.constants'
import useGetStage from '@app/containers/Stages/hooks/useGetStage'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useUpdateStage from '@app/containers/Stages/hooks/useUpdateStage'
import { stageQueryKey } from '@app/containers/Stages/constants/stage.query-key'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import { createStageSchema, stageSchema } from '@app/containers/Stages/constants/stage.schemas'
import useGetDepartments from '@app/containers/Departments/hooks/useGetDepartments'
import Combobox from '@app/components/Combobox'

const defaultValues: DefaultValues<z.infer<typeof createStageSchema>> = {
  code: undefined,
  name: undefined,
  workingDept: undefined
}

const StageDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createStageSchema>>({
    resolver: zodResolver(createStageSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteStages, isPending: isDeletingStages } = useDeleteStages()
  const { mutate: mutateCreateStage, isPending: isCreatingStage } = useCreateStage()
  const { mutate: mutateUpdateStage, isPending: isUpdatingStage } = useUpdateStage()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createStageSchema>) => {
    if (isEdit) {
      mutateUpdateStage(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update stage ${stage?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [stageQueryKey.getStage(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [stageQueryKey.getAllStages()[0]] })
          }
        }
      )
    } else {
      mutateCreateStage(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create stage successfully`)
            router.push(STAGE_LIST_ROUTE)
            await queryClient.invalidateQueries({ queryKey: [stageQueryKey.getAllStages()[0]] })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteStages(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete stage ${stage?.data.code} successfully`)
          router.push(STAGE_LIST_ROUTE)
          await queryClient.invalidateQueries({ queryKey: [stageQueryKey.getAllStages()[0]] })
        }
      }
    )
  }

  const { data: stage, isLoading: isGettingStage } = useGetStage({ id: id as string })
  const { data: departments, isLoading: isGettingDepartments } = useGetDepartments()
  const departmentOptions = generateMultiSelectOptions({
    data: departments?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (stage?.data) {
      const { code, workingDept, name } = stage.data

      reset({
        code,
        workingDept,
        name
      })
    }
  }, [stage, isEdit, departments])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingStage || isGettingDepartments} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit stage ${stage?.data.code}` : 'Create stage'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              control={form.control}
              name='name'
              label={'Stage name'}
              renderComponent={({ field }) => <Input placeholder='Input stage name' {...field} />}
            />
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Input stage code' {...field} />}
            />
            <FormField
              control={form.control}
              name='workingDept'
              label={'Working Department'}
              renderComponent={({ field }) => (
                <Combobox
                  onValueChange={field.onChange}
                  value={field.value}
                  options={departmentOptions}
                  name={'workingDept'}
                  valueKey={'id'}
                  placeholder={'Select working department'}
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
                isLoading={isCreatingStage || isDeletingStages || isUpdatingStage}
                onClick={() => setOpenDialogDelete(true)}
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button isLoading={isCreatingStage || isDeletingStages || isUpdatingStage} type='submit'>
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

export default StageDetail
