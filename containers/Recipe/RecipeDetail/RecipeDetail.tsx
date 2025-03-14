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
import useDeleteRecipes from '@app/containers/Recipe/hooks/useDeleteRecipes'
import useGetRecipe from '@app/containers/Recipe/hooks/useGetRecipe'
import FormField from '@app/components/Form/FormField'
import Detail from '@app/containers/Recipe/RecipeDetail/components/Detail'
import MultiSelectHook from '@app/components/Form/MultiSelectHook/MultiSelectHook'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import { Input } from '@app/components/ui/input'
import { RECIPE_LIST_ROUTE } from '@app/containers/Recipe/constants/recipe-routes.constants'
import useCreateRecipe from '@app/containers/Recipe/hooks/useCreateRecipe'
import useUpdateRecipe from '@app/containers/Recipe/hooks/useUpdateRecipe'
import { recipeQueryKey } from '@app/containers/Recipe/constants/recipe-query.key'
import { useQueryClient } from '@tanstack/react-query'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { BaseProduct } from '@app/containers/Products/types/product.types'
import { toast } from 'react-toastify'
import { createRecipePayloadSchema } from '@app/containers/Recipe/constants/recipe.schemas'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'

type Values = z.infer<typeof createRecipePayloadSchema>

const defaultValues: DefaultValues<Values> = {
  code: '',
  detail: [],
  applyProduct: [],
  posibilityProduct: []
}

const RecipeDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createRecipePayloadSchema>>({
    resolver: zodResolver(createRecipePayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteRecipes, isPending: isDeletingRecipes } = useDeleteRecipes()
  const { mutate: mutateCreateRecipe, isPending: isCreatingRecipe } = useCreateRecipe()
  const { mutate: mutateUpdateRecipe, isPending: isUpdatingRecipe } = useUpdateRecipe()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const onSubmit = (values: z.infer<typeof createRecipePayloadSchema>) => {
    if (isEdit) {
      mutateUpdateRecipe(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update recipe ${recipe?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [recipeQueryKey.getRecipe(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [recipeQueryKey.getAllRecipes()[0]] })
          }
        }
      )
    } else {
      mutateCreateRecipe(values, {
        onSuccess: async () => {
          toast.success(`Create recipe ${recipe?.data.code} successfully`)
          await queryClient.invalidateQueries({ queryKey: [recipeQueryKey.getAllRecipes()[0]] })

          router.push(RECIPE_LIST_ROUTE)
        }
      })
    }
  }
  const handleDelete = () => {
    mutateDeleteRecipes(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Create recipe ${recipe?.data.code} successfully`)
          await queryClient.invalidateQueries({ queryKey: [recipeQueryKey.getAllRecipes()[0]] })
          router.push(RECIPE_LIST_ROUTE)
        }
      }
    )
  }

  const { data: recipe, isLoading: isGettingRecipe } = useGetRecipe({ id: id as string })
  const { data: products, isLoading: isGettingProducts } = useGetProducts()

  const productOptions = generateMultiSelectOptions({
    data: products?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (recipe?.data) {
      const { code, detail, posibilityProduct, applyProduct } = recipe.data

      reset({
        code,
        detail,
        posibilityProduct,
        applyProduct
      })
    }
  }, [recipe, id, products])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingRecipe || isGettingProducts} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit Recipe ${recipe?.data.code}` : 'Create Recipe'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              label='Apply products'
              name={'applyProduct'}
              renderComponent={({ field }) => (
                <MultiSelectHook<BaseProduct> {...field} options={productOptions} filterByKey={'id'} />
              )}
            />
            <FormField
              label='Posibility products'
              name={'posibilityProduct'}
              renderComponent={({ field }) => (
                <MultiSelectHook<BaseProduct> {...field} options={productOptions} filterByKey={'id'} />
              )}
            />
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Product code' {...field} />}
            />
          </div>
          <div className='mt-8 desktop:w-1/2'>
            <Detail />
          </div>
        </PageContent>
        <PageFooter>
          <div className='flex gap-4'>
            {isEdit && (
              <Button
                variant='destructive'
                color='red'
                onClick={() => setOpenDialogDelete(true)}
                isLoading={isCreatingRecipe || isDeletingRecipes || isUpdatingRecipe}
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingRecipe || isDeletingRecipes || isUpdatingRecipe}
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

export default RecipeDetail
