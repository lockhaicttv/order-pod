import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { SaveIcon, Trash2Icon, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Form } from '@app/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ConfirmDialog from '@app/components/ConfirmDialog'
import { useEffect, useState } from 'react'
import FormField from '@app/components/Form/FormField'
import { Input } from '@app/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useDeleteMachines from '@app/containers/Machines/hooks/useDeleteMachines'
import useCreateMachine from '@app/containers/Machines/hooks/useCreateMachine'
import { MACHINE_LIST_ROUTE } from '@app/containers/Machines/constants/machine-routes.constants'
import useGetMachine from '@app/containers/Machines/hooks/useGetMachine'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import { generateSelectOptions } from '@app/utils/generateSelectOptions'
import { Stage } from '@app/containers/Stages/types/stage.types'
import useUpdateMachine from '@app/containers/Machines/hooks/useUpdateMachine'
import { machineQueryKey } from '@app/containers/Machines/constants/machine.query-key'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import Combobox from '@app/components/Combobox'

const machineSchema = z.object({
  code: z.string(),
  stage: z.string()
})

const defaultValues: z.infer<typeof machineSchema> = {
  code: '',
  stage: ''
}

const MachineDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof machineSchema>>({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteMachines, isPending: isDeletingMachines } = useDeleteMachines()
  const { mutate: mutateCreateMachine, isPending: isCreatingMachine } = useCreateMachine()
  const { mutate: mutateUpdateMachine, isPending: isUpdatingMachine } = useUpdateMachine()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof machineSchema>) => {
    if (isEdit) {
      mutateUpdateMachine(
        {
          ...values,
          stage: stages?.data.filter((stage) => stage.id === values.stage)?.[0] as Stage,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update machine ${machine?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [machineQueryKey.getMachine(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [machineQueryKey.getAllMachines()[0]] })
          }
        }
      )
    } else {
      mutateCreateMachine(
        {
          ...values,
          stage: stages?.data.filter((stage) => stage.id === values.stage)?.[0] as Stage
        },
        {
          onSuccess: async () => {
            toast.success(`Create machine successfully`)
            router.push(MACHINE_LIST_ROUTE)
            await queryClient.invalidateQueries({ queryKey: [machineQueryKey.getAllMachines()[0]] })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteMachines(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete machine ${machine?.data.code} successfully`)
          router.push(MACHINE_LIST_ROUTE)
          await queryClient.invalidateQueries({ queryKey: [machineQueryKey.getAllMachines()[0]] })
        }
      }
    )
  }

  const { data: machine, isLoading: isGettingMachine } = useGetMachine({ id: id as string })
  const { data: stages, isLoading: isGettingStages } = useGetStages()
  const stageOptions = generateSelectOptions({ data: stages?.data, labelKey: 'code', valueKey: 'id' })

  useEffect(() => {
    if (machine?.data) {
      const { code, stage } = machine.data

      reset({
        code,
        stage: machine?.data?.stage.id
      })
    }
  }, [machine, isEdit, stages])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingMachine} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit Machine ${machine?.data.code}` : 'Create Machine'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Machine code' {...field} />}
            />
            <FormField
              control={form.control}
              name='stage'
              label={'Stage'}
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
                isLoading={isCreatingMachine || isDeletingMachines || isUpdatingMachine}
                onClick={() => setOpenDialogDelete(true)}
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button isLoading={isCreatingMachine || isDeletingMachines || isUpdatingMachine} type='submit'>
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

export default MachineDetail
