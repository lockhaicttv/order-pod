import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { SaveIcon, Trash2Icon } from 'lucide-react'
import { DefaultValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@app/components/ui/form'
import { Input } from '@app/components/ui/input'
import { useEffect, useState } from 'react'
import FormField from '@app/components/Form/FormField'
import useGetProduct from '@app/containers/Products/hooks/useGetProduct'
import { useParams, useRouter } from 'next/navigation'
import useGetRecipes from '@app/containers/Recipe/hooks/useGetRecipes'
import useGetProductTypes from '@app/containers/ProductTypes/hooks/useGetProductTypes'
import useGetProcesses from '@app/containers/Processes/hooks/useGetProcesses'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useUpdateProduct from '@app/containers/Products/hooks/useUpdateProduct'
import useCreateProduct from '@app/containers/Products/hooks/useCreateProduct'
import ConfirmDialog from '@app/components/ConfirmDialog'
import useDeleteProducts from '@app/containers/Products/hooks/useDeleteProducts'
import { useQueryClient } from '@tanstack/react-query'
import { productQueryKey } from '@app/containers/Products/constants/product.query-key'
import { PRODUCT_LIST_ROUTE } from '@app/containers/Products/constants/product-routes.constants'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent/PageContent'
import Combobox from '@app/components/Combobox'
import { createProductPayloadSchema } from '@app/containers/Products/constants/product.schemas'

const defaultValues: DefaultValues<z.infer<typeof createProductPayloadSchema>> = {
  code: '',
  name: '',
  type: '',
  unit: '',
  weight: 0,
  recipe: null,
  process: null
}

const ProductsDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const form = useForm<z.infer<typeof createProductPayloadSchema>>({
    resolver: zodResolver(createProductPayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })
  const queryClient = useQueryClient()

  const { handleSubmit, reset } = form
  const { mutate: mutateUpdateProduct, isPending: isUpdatingProduct } = useUpdateProduct()
  const { mutate: mutateCreateProduct, isPending: isCreatingProduct } = useCreateProduct()
  const { mutate: mutateDeleteProducts, isPending: isDeletingProducts } = useDeleteProducts()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createProductPayloadSchema>) => {
    if (isEdit) {
      mutateUpdateProduct(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update product ${product?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [productQueryKey.getProductById(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [productQueryKey.getAllProduct()[0]] })
          }
        }
      )
    } else {
      mutateCreateProduct(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create product successfully`)
            await queryClient.invalidateQueries({ queryKey: [productQueryKey.getAllProduct()[0]] })
            router.push(PRODUCT_LIST_ROUTE)
          }
        }
      )
    }
  }

  const handleDelete = () => {
    mutateDeleteProducts(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete product successfully`)
          await queryClient.invalidateQueries({ queryKey: [productQueryKey.getAllProduct()[0]] })
          router.push(PRODUCT_LIST_ROUTE)
        }
      }
    )
  }

  const { data: product, isLoading: isGettingProduct } = useGetProduct({ id: id as string })
  const { data: recipes, isLoading: isGettingRecipes } = useGetRecipes()
  const { data: productTypes, isLoading: isGettingProductTypes } = useGetProductTypes()
  const { data: processes, isLoading: isGettingProcess } = useGetProcesses()

  const recipeOptions = generateMultiSelectOptions({
    data: recipes?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })
  const productTypesOptions = generateMultiSelectOptions({
    data: productTypes?.data,
    labelKey: 'name',
    valueKey: 'name',
    valueAsObject: false
  })
  const processOptions = generateMultiSelectOptions({
    data: processes?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (id && product?.data) {
      const { code, name, process, unit, weight, recipe, type } = product.data

      reset({ code, name: name ?? '', type, unit, weight, recipe, process })
    }
  }, [id, product, productTypes, processes, recipes])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingProduct || isGettingProductTypes || isGettingRecipes || isGettingProcess} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>
              {isEdit ? `Edit product ${product?.data?.code || ''}` : 'Create product'}
            </Typography>
          </div>
          <div className='flex w-full space-x-4'>
            <div className='space-y-4 mt-4 w-full desktop:w-1/2 tablet:w-1/2'>
              <FormField
                control={form.control}
                name='code'
                label={'Code'}
                renderComponent={({ field }) => <Input placeholder='Product code' {...field} />}
              />
              <FormField
                control={form.control}
                name='name'
                label={'Name'}
                renderComponent={({ field }) => <Input placeholder='Product name' {...field} />}
              />
              <FormField
                control={form.control}
                name='type'
                label='Product Type'
                renderComponent={({ field }) => (
                  <Combobox
                    onValueChange={field.onChange}
                    value={field.value}
                    options={productTypesOptions}
                    name={'type'}
                    placeholder='Select product type'
                  />
                )}
              />
              <div className='flex w-full space-x-4'>
                <div className='w-1/2'>
                  <FormField
                    control={form.control}
                    name='unit'
                    label={'Unit'}
                    renderComponent={({ field }) => <Input placeholder='Unit' {...field} />}
                  />
                </div>
                <div className='w-1/2'>
                  <FormField
                    control={form.control}
                    name='weight'
                    label={'Weight'}
                    renderComponent={({ field }) => (
                      <Input
                        placeholder='Weight'
                        type='number'
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name='recipe'
                label={'Recipe'}
                renderComponent={({ field }) => (
                  <Combobox
                    onValueChange={field.onChange}
                    value={field.value}
                    options={recipeOptions}
                    name={'recipe'}
                    placeholder={'Select Recipe'}
                    valueKey='id'
                  />
                )}
              />
              <FormField
                control={form.control}
                name='process'
                label={'Process'}
                renderComponent={({ field }) => (
                  <Combobox
                    onValueChange={field.onChange}
                    value={field.value}
                    options={processOptions}
                    name={'process'}
                    placeholder={'Select Process'}
                    valueKey='id'
                  />
                )}
              />
            </div>
            {/*<div className='w-1/2'>*/}
            {/*  <FormField*/}
            {/*    control={form.control}*/}
            {/*    name='productImage'*/}
            {/*    label='Image'*/}
            {/*    renderComponent={({ field }) => (*/}
            {/*      <div className='h-full w-full'>*/}
            {/*        <ImageUpload onChange={field.onChange} value={field.value} />*/}
            {/*      </div>*/}
            {/*    )}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
        </PageContent>
        <PageFooter>
          <div className='flex gap-4'>
            {isEdit && (
              <Button
                variant='destructive'
                color='red'
                isLoading={isCreatingProduct || isUpdatingProduct || isDeletingProducts}
                onClick={() => setOpenDialogDelete(true)}
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button type='submit' isLoading={isCreatingProduct || isUpdatingProduct || isDeletingProducts}>
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

export default ProductsDetail
