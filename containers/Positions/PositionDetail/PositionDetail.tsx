import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { SaveIcon, Trash2Icon } from 'lucide-react'
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
import useDeletePositions from '@app/containers/Positions/hooks/useDeletePositions'
import useCreatePosition from '@app/containers/Positions/hooks/useCreatePosition'
import { POSITION_LIST_ROUTE } from '@app/containers/Positions/constants/position-routes.constants'
import useGetPosition from '@app/containers/Positions/hooks/useGetPosition'
import useUpdatePosition from '@app/containers/Positions/hooks/useUpdatePosition'
import { positionQueryKey } from '@app/containers/Positions/constants/position.query-key'
import { toast } from 'react-toastify'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import { createPositionPayloadSchema } from '@app/containers/Positions/constants/position.schemas'

const defaultValues: z.infer<typeof createPositionPayloadSchema> = {
  name: ''
}

const PositionGroupDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createPositionPayloadSchema>>({
    resolver: zodResolver(createPositionPayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeletePositions, isPending: isDeletingPositions } = useDeletePositions()
  const { mutate: mutateCreatePosition, isPending: isCreatingPosition } = useCreatePosition()
  const { mutate: mutateUpdatePosition, isPending: isUpdatingPosition } = useUpdatePosition()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof createPositionPayloadSchema>) => {
    if (isEdit) {
      mutateUpdatePosition(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update position ${position?.data.id} successfully`)
            await queryClient.invalidateQueries({ queryKey: [positionQueryKey.getPosition(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [positionQueryKey.getAllPositions()[0]] })
          }
        }
      )
    } else {
      mutateCreatePosition(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create position successfully`)
            router.push(POSITION_LIST_ROUTE)
            await queryClient.invalidateQueries({
              queryKey: [positionQueryKey.getAllPositions()[0]]
            })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeletePositions(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete position ${position?.data.id} successfully`)
          router.push(POSITION_LIST_ROUTE)
          await queryClient.invalidateQueries({
            queryKey: [positionQueryKey.getAllPositions()[0]]
          })
        }
      }
    )
  }

  const { data: position, isLoading: isGettingPosition } = useGetPosition({ id: id as string })

  useEffect(() => {
    if (position?.data) {
      const { name } = position.data

      reset({ name })
    }
  }, [position, isEdit])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingPosition} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>{isEdit ? `Edit Position ${position?.data.id}` : 'Create Position'}</Typography>
          </div>
          <div className='flex flex-col gap-2 mt-4 mt-4 w-full desktop:w-1/4 tablet:w-1/2'>
            <FormField
              control={form.control}
              name='name'
              label={'Position name'}
              renderComponent={({ field }) => <Input placeholder='Position name' {...field} />}
            />
          </div>
        </PageContent>
        <PageFooter>
          <div className='flex gap-4'>
            {isEdit && (
              <Button
                variant='destructive'
                color='red'
                isLoading={isCreatingPosition || isDeletingPositions || isUpdatingPosition}
                onClick={() => setOpenDialogDelete(true)}
                type='button'
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingPosition || isDeletingPositions || isUpdatingPosition}
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

export default PositionGroupDetail
