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
import useDeleteTools from '@app/containers/Tools/hooks/useDeleteTools'
import useCreateTool from '@app/containers/Tools/hooks/useCreateTool'
import { TOOL_LIST_ROUTE } from '@app/containers/Tools/constants/tool-routes.constants'
import useGetTool from '@app/containers/Tools/hooks/useGetTool'
import useUpdateTool from '@app/containers/Tools/hooks/useUpdateTool'
import { toolQueryKey } from '@app/containers/Tools/constants/tool.query-key'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import { creatToolSchema } from '@app/containers/Tools/constants/tool.schemas'
import NumberInput from '@app/components/NumberInput'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import Combobox from '@app/components/Combobox'

const defaultValues: DefaultValues<z.infer<typeof creatToolSchema>> = {
  name: '',
  cavity: undefined,
  code: '',
  outputProduct: undefined,
  stage: undefined,
  volume: undefined
}

const ToolGroupDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof creatToolSchema>>({
    resolver: zodResolver(creatToolSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteTools, isPending: isDeletingTools } = useDeleteTools()
  const { mutate: mutateCreateTool, isPending: isCreatingTool } = useCreateTool()
  const { mutate: mutateUpdateTool, isPending: isUpdatingTool } = useUpdateTool()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof creatToolSchema>) => {
    if (isEdit) {
      mutateUpdateTool(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update tool ${tool?.data.id} successfully`)
            await queryClient.invalidateQueries({ queryKey: [toolQueryKey.getTool(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [toolQueryKey.getAllTools()[0]] })
          }
        }
      )
    } else {
      mutateCreateTool(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create tool successfully`)
            router.push(TOOL_LIST_ROUTE)
            await queryClient.invalidateQueries({
              queryKey: [toolQueryKey.getAllTools()[0]]
            })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteTools(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete tool ${tool?.data.id} successfully`)
          router.push(TOOL_LIST_ROUTE)
          await queryClient.invalidateQueries({
            queryKey: [toolQueryKey.getAllTools()[0]]
          })
        }
      }
    )
  }

  const { data: tool, isLoading: isGettingTool } = useGetTool({ id: id as string })
  const { data: stages } = useGetStages()
  const { data: products } = useGetProducts()
  const stageOptions = generateMultiSelectOptions({
    data: stages?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })
  const productOptions = generateMultiSelectOptions({
    data: products?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (tool?.data) {
      const { name, outputProduct, stage, cavity, code, volume } = tool.data

      reset({ name, outputProduct, stage, cavity, code, volume })
    }
  }, [tool, isEdit])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingTool} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit tool ${tool?.data.id}` : 'Create tool'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Tool code' {...field} />}
            />
            <FormField
              control={form.control}
              name={'name'}
              label={'Name'}
              renderComponent={({ field }) => <Input {...field} placeholder='Tool name' />}
            />
            <FormField
              control={form.control}
              name={`cavity`}
              label={`Cavity`}
              renderComponent={({ field }) => (
                <NumberInput
                  {...field}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder='Cavity of tool'
                />
              )}
            />
            <FormField
              label='Output product'
              name={`outputProduct`}
              renderComponent={({ field }) => (
                <Combobox
                  {...field}
                  onValueChange={field.onChange}
                  options={productOptions}
                  valueKey={'id'}
                  placeholder={'Select output product'}
                />
              )}
            />
            <FormField
              label='Stage'
              name={`stage`}
              renderComponent={({ field }) => (
                <Combobox
                  {...field}
                  onValueChange={field.onChange}
                  options={stageOptions}
                  valueKey={'id'}
                  placeholder={'Select stage'}
                />
              )}
            />
            <FormField
              control={form.control}
              name={`volume`}
              label={'Volume'}
              renderComponent={({ field }) => (
                <NumberInput {...field} onChange={(value) => field.onChange(value)} placeholder='Input volume' />
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
                isLoading={isCreatingTool || isDeletingTools || isUpdatingTool}
                onClick={() => setOpenDialogDelete(true)}
                type='button'
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingTool || isDeletingTools || isUpdatingTool}
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

export default ToolGroupDetail
