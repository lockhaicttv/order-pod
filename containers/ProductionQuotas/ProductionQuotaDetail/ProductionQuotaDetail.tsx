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
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import PageFooter from '@app/components/Page/PageFooter'
import useGetProductionQuota from '@app/containers/ProductionQuotas/hooks/useGetProductionQuota'
import useGetTools from '@app/containers/Tools/hooks/useGetTools'
import useDeleteProductionQuotas from '@app/containers/ProductionQuotas/hooks/useDeleteProductionQuotas'
import useCreateProductionQuota from '@app/containers/ProductionQuotas/hooks/useCreateProductionQuota'
import useUpdateProductionQuota from '@app/containers/ProductionQuotas/hooks/useUpdateProductionQuota'
import { productionQuotaQueryKey } from '@app/containers/ProductionQuotas/constants/production-quota.query-key'
import { PRODUCTION_QUOTA_LIST_ROUTE } from '@app/containers/ProductionQuotas/constants/production-quota-routes.constants'
import { toast } from 'react-toastify'
import { createProductionQuotaPayloadSchema } from '@app/containers/ProductionQuotas/constants/production-quota.schemas'
import Combobox from '@app/components/Combobox'
import PageContent from '@app/components/Page/PageContent'

const defaultValues: DefaultValues<z.infer<typeof createProductionQuotaPayloadSchema>> = {
  code: '',
  stage: undefined,
  productOutput: undefined,
  tool: undefined,
  difficultLevel: '',
  numberOfemployees: 0,
  produceQuota: 0,
  unit: '',
  totalWeight: 0
}

const ProductionQuotaDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createProductionQuotaPayloadSchema>>({
    resolver: zodResolver(createProductionQuotaPayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteProductionQuotas, isPending: isDeletingProductionQuotas } = useDeleteProductionQuotas()
  const { mutate: mutateCreateProductionQuota, isPending: isCreatingProductionQuota } = useCreateProductionQuota()
  const { mutate: mutateUpdateProductionQuota, isPending: isUpdatingProductionQuota } = useUpdateProductionQuota()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createProductionQuotaPayloadSchema>) => {
    const { stage, productOutput, tool } = values

    if (isEdit) {
      mutateUpdateProductionQuota(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update production quota ${productionQuota?.data.code} successfully`)
            await queryClient.invalidateQueries({
              queryKey: [productionQuotaQueryKey.getProductionQuota(id as string)[0]]
            })
            await queryClient.invalidateQueries({ queryKey: [productionQuotaQueryKey.getAllProductionQuota()[0]] })
          }
        }
      )
    } else {
      mutateCreateProductionQuota(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create production quota successfully`)
            router.push(PRODUCTION_QUOTA_LIST_ROUTE)
            await queryClient.invalidateQueries({ queryKey: [productionQuotaQueryKey.getAllProductionQuota()[0]] })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteProductionQuotas(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete production quota successfully`)
          router.push(PRODUCTION_QUOTA_LIST_ROUTE)
          await queryClient.invalidateQueries({ queryKey: [productionQuotaQueryKey.getAllProductionQuota()[0]] })
        }
      }
    )
  }

  const { data: productionQuota, isLoading: isGettingProductionQuota } = useGetProductionQuota({ id: id as string })
  const { data: stages, isLoading: isGettingStages } = useGetStages()
  const { data: products, isLoading: isGettingProducts } = useGetProducts()
  const { data: tools, isLoading: isGettingTools } = useGetTools()

  const productOptions = generateMultiSelectOptions({
    data: products?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })
  const stageOptions = generateMultiSelectOptions({
    data: stages?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })
  const toolOptions = generateMultiSelectOptions({
    data: tools?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (productionQuota?.data) {
      const { code, stage, difficultLevel, unit, productOutput, produceQuota, tool, totalWeight, numberOfemployees } =
        productionQuota.data

      reset({
        code,
        stage,
        difficultLevel,
        unit,
        productOutput,
        produceQuota,
        tool,
        totalWeight,
        numberOfemployees
      })
    }
  }, [productionQuota, isEdit, stages, products, tools])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingProductionQuota || isGettingStages || isGettingProducts || isGettingTools} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>
              {isEdit ? `Edit production quota ${productionQuota?.data.code}` : 'Create production quota'}
            </Typography>
          </div>
          <div className='grid grid-cols-1 desktop:grid-cols-2 tablet:grid-cols-2 gap-4 mt-4 desktop:w-1/2'>
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Production quota code' {...field} />}
            />
            <FormField
              control={form.control}
              name='productOutput'
              label='Product Output'
              renderComponent={({ field }) => (
                <Combobox
                  onValueChange={field.onChange}
                  value={field.value}
                  options={productOptions}
                  name={'type'}
                  valueKey='id'
                  placeholder='Select product output'
                />
              )}
            />
            <FormField
              control={form.control}
              name='stage'
              label='Stage'
              renderComponent={({ field }) => (
                <Combobox
                  onValueChange={field.onChange}
                  value={field.value}
                  options={stageOptions}
                  name={'type'}
                  valueKey='id'
                  placeholder='Select stage'
                />
              )}
            />
            <FormField
              control={form.control}
              name='tool'
              label='Tool'
              renderComponent={({ field }) => (
                <Combobox
                  onValueChange={field.onChange}
                  value={field.value}
                  options={toolOptions}
                  name={'type'}
                  valueKey='id'
                  placeholder='Select tool'
                />
              )}
            />
            <FormField
              control={form.control}
              name='difficultLevel'
              label={'Difficult level'}
              renderComponent={({ field }) => <Input placeholder='Input difficult level' {...field} />}
            />
            <FormField
              control={form.control}
              name='numberOfemployees'
              label={'Number of employees'}
              renderComponent={({ field }) => (
                <Input
                  placeholder='Input number of employees'
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              )}
            />
            <FormField
              control={form.control}
              name='produceQuota'
              label={'Produce quota'}
              renderComponent={({ field }) => (
                <Input
                  placeholder='Input produce quota'
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              )}
            />
            <FormField
              control={form.control}
              name='unit'
              label={'Unit'}
              renderComponent={({ field }) => <Input placeholder='Input unit' {...field} />}
            />
            <FormField
              control={form.control}
              name='totalWeight'
              label={'totalWeight'}
              renderComponent={({ field }) => (
                <Input
                  placeholder='Input total weight'
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              )}
            />
          </div>
        </PageContent>
        <PageFooter>
          <Button
            variant='destructive'
            color='red'
            isLoading={
              isCreatingProductionQuota || isDeletingProductionQuotas || isUpdatingProductionQuota || isGettingTools
            }
            onClick={() => setOpenDialogDelete(true)}
          >
            <Trash2Icon className='mr-2' />
            DELETE
          </Button>
          <Button
            isLoading={
              isCreatingProductionQuota || isDeletingProductionQuotas || isUpdatingProductionQuota || isGettingTools
            }
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

export default ProductionQuotaDetail
