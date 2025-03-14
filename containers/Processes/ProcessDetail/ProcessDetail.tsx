import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { SaveIcon, Trash2Icon, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { DefaultValues, useFieldArray, useForm } from 'react-hook-form'
import { Form } from '@app/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ConfirmDialog from '@app/components/ConfirmDialog'
import { useEffect, useState } from 'react'
import FormField from '@app/components/Form/FormField'
import { Input } from '@app/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useDeleteProcesses from '@app/containers/Processes/hooks/useDeleteProcesses'
import useCreateProcess from '@app/containers/Processes/hooks/useCreateProcess'
import useUpdateProcess from '@app/containers/Processes/hooks/useUpdateProcess'
import { processQueryKey } from '@app/containers/Processes/constants/process.query-key'
import { PROCESS_LIST_ROUTE } from '@app/containers/Processes/constants/process-routes.constants'
import useGetProcess from '@app/containers/Processes/hooks/useGetProcess'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import Detail from '@app/containers/Processes/ProcessDetail/components/Detail'
import { PlusIcon } from '@radix-ui/react-icons'
import PageFooter from '@app/components/Page/PageFooter'
import { toast } from 'react-toastify'
import { createProcessPayloadSchema } from '@app/containers/Processes/constants/process.schemas'
import PageContent from '@app/components/Page/PageContent'
import Combobox from '@app/components/Combobox'

type FormValues = DefaultValues<z.infer<typeof createProcessPayloadSchema>>

const defaultValues: FormValues = {
  code: undefined,
  product: undefined,
  detail: []
}

const ProcessDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createProcessPayloadSchema>>({
    resolver: zodResolver(createProcessPayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })
  const {
    append: processDetailAppend,
    remove: processDetailRemove,
    fields: processDetailFields
  } = useFieldArray({
    control: form.control,
    name: 'detail'
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteProcesses, isPending: isDeletingProcess } = useDeleteProcesses()
  const { mutate: mutateCreateProcess, isPending: isCreatingProcess } = useCreateProcess()
  const { mutate: mutateUpdateProcess, isPending: isUpdatingProcess } = useUpdateProcess()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createProcessPayloadSchema>) => {
    if (isEdit) {
      mutateUpdateProcess(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update process ${process?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [processQueryKey.getProcess(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [processQueryKey.getAllProcesses()[0]] })
          }
        }
      )
    } else {
      mutateCreateProcess(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create process successfully`)
            router.push(PROCESS_LIST_ROUTE)
            await queryClient.invalidateQueries({ queryKey: [processQueryKey.getAllProcesses()[0]] })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteProcesses(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete process successfully`)
          router.push(PROCESS_LIST_ROUTE)
          await queryClient.invalidateQueries({ queryKey: [processQueryKey.getAllProcesses()[0]] })
        }
      }
    )
  }

  const { data: process, isLoading: isGettingProcess } = useGetProcess({ id: id as string })
  const { data: stages, isLoading: isGettingStages } = useGetStages()
  const { data: products, isLoading: isGettingProducts } = useGetProducts()
  const productOptions = generateMultiSelectOptions({
    data: products?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (process?.data) {
      const { code, product, detail } = process.data

      reset({
        code,
        product,
        detail
      })
    }
  }, [process, isEdit, stages, products])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingProcess || isGettingStages || isGettingProducts} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit process ${process?.data.code}` : 'Create process'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Process code' {...field} />}
            />
            <FormField
              control={form.control}
              name='product'
              label='Product'
              renderComponent={({ field }) => (
                <Combobox
                  onValueChange={field.onChange}
                  value={field.value}
                  options={productOptions}
                  name={'type'}
                  valueKey='id'
                  placeholder='Select product'
                />
              )}
            />
          </div>
          <div className='mt-8 w-full'>
            <div className='mb-4 flex gap-2 items-center'>
              <Typography className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Process details
              </Typography>
              <Button
                onClick={() =>
                  processDetailAppend({
                    stageOrder: processDetailFields.length,
                    stage: null,
                    backupRate: 0,
                    exchangeRate: 0,
                    input: null,
                    output: null
                  })
                }
                variant='ghost'
                size='sm'
                className='h-full'
                type='button'
              >
                <PlusIcon />
              </Button>
            </div>
            {processDetailFields.map((processDetailField, index) => (
              <div
                className='flex space-x-2 mobile:gap-0 mb-4 items-start rounded-sm border p-4 pr-1 justify-between'
                key={processDetailField.id}
              >
                <Detail index={index} />
                <Button onClick={() => processDetailRemove(index)} variant='ghost' size='sm' className='h-full'>
                  <XIcon size={15} />
                </Button>
              </div>
            ))}
            <div className='flex justify-center'>
              <Button
                onClick={() =>
                  processDetailAppend({
                    stageOrder: processDetailFields.length,
                    stage: null,
                    backupRate: 0,
                    exchangeRate: 0,
                    input: null,
                    output: null
                  })
                }
                type='button'
                size='icon'
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        </PageContent>
        <PageFooter>
          {isEdit && (
            <Button
              variant='destructive'
              color='red'
              isLoading={isCreatingProcess || isDeletingProcess || isUpdatingProcess}
              onClick={() => setOpenDialogDelete(true)}
            >
              <Trash2Icon className='mr-2' />
              DELETE
            </Button>
          )}
          <Button
            isLoading={isCreatingProcess || isDeletingProcess || isUpdatingProcess}
            disabled={!form.formState.isDirty}
            type='submit'
          >
            <SaveIcon className='mr-2' />
            SAVE
          </Button>
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

export default ProcessDetail
