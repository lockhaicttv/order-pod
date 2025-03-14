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
import useDeleteProductIssues from '@app/containers/ProductIssues/hooks/useDeleteProductIssues'
import useCreateProductIssue from '@app/containers/ProductIssues/hooks/useCreateProductIssue'
import { PRODUCT_ISSUE_LIST_ROUTE } from '@app/containers/ProductIssues/constants/product-issue-routes.constants'
import useGetProductIssue from '@app/containers/ProductIssues/hooks/useGetProductIssue'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useUpdateProductIssue from '@app/containers/ProductIssues/hooks/useUpdateProductIssue'
import { productIssueQueryKey } from '@app/containers/ProductIssues/constants/product-issue.query-key'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import { createProductIssueSchema } from '@app/containers/ProductIssues/constants/product-issue.schemas'
import Combobox from '@app/components/Combobox'

const defaultValues: DefaultValues<z.infer<typeof createProductIssueSchema>> = {
  code: undefined,
  name: undefined,
  issueStage: undefined
}

const ProductIssueGroupDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createProductIssueSchema>>({
    resolver: zodResolver(createProductIssueSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteProductIssues, isPending: isDeletingProductIssues } = useDeleteProductIssues()
  const { mutate: mutateCreateProductIssue, isPending: isCreatingProductIssue } = useCreateProductIssue()
  const { mutate: mutateUpdateProductIssue, isPending: isUpdatingProductIssue } = useUpdateProductIssue()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createProductIssueSchema>) => {
    if (isEdit) {
      mutateUpdateProductIssue(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update product issue ${productIssue?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [productIssueQueryKey.getProductIssue(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [productIssueQueryKey.getAllProductIssues()[0]] })
          }
        }
      )
    } else {
      mutateCreateProductIssue(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create product issue successfully`)
            router.push(PRODUCT_ISSUE_LIST_ROUTE)
            await queryClient.invalidateQueries({
              queryKey: [productIssueQueryKey.getAllProductIssues()[0]]
            })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteProductIssues(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete product issue ${productIssue?.data.code} successfully`)
          router.push(PRODUCT_ISSUE_LIST_ROUTE)
          await queryClient.invalidateQueries({
            queryKey: [productIssueQueryKey.getAllProductIssues()[0]]
          })
        }
      }
    )
  }

  const { data: productIssue, isLoading: isGettingProductIssue } = useGetProductIssue({ id: id as string })
  const { data: stages, isLoading: isGettingStages } = useGetStages()
  const stageOptions = generateMultiSelectOptions({
    data: stages?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (productIssue?.data) {
      const { code, issueStage, name } = productIssue.data

      reset({
        name,
        code,
        issueStage
      })
    }
  }, [productIssue, isEdit, stages])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingProductIssue || isGettingStages} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>
              {isEdit ? `Edit product issue ${productIssue?.data.code}` : 'Create product issue'}
            </Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              control={form.control}
              name='code'
              label={'Code'}
              renderComponent={({ field }) => <Input placeholder='Issue code' {...field} />}
            />
            <FormField
              control={form.control}
              name='name'
              label={'Issue name'}
              renderComponent={({ field }) => <Input placeholder='Issue name' {...field} />}
            />
            <FormField
              control={form.control}
              name='issueStage'
              label={'Issue Stage'}
              renderComponent={({ field }) => (
                <Combobox
                  onValueChange={field.onChange}
                  value={field.value}
                  options={stageOptions}
                  name={'issueStage'}
                  placeholder={'Select issue stage'}
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
                isLoading={isCreatingProductIssue || isDeletingProductIssues || isUpdatingProductIssue}
                onClick={() => setOpenDialogDelete(true)}
                type='button'
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingProductIssue || isDeletingProductIssues || isUpdatingProductIssue}
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

export default ProductIssueGroupDetail
