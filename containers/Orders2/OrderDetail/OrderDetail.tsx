import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { SaveIcon, Trash2Icon, TruckIcon, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { DefaultValues, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { Form } from '@app/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ConfirmDialog from '@app/components/ConfirmDialog'
import { useEffect, useState } from 'react'
import FormField from '@app/components/Form/FormField'
import { Input } from '@app/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useDeleteOrders from '@app/containers/Orders/hooks/useDeleteOrders'
import useCreateOrder from '@app/containers/Orders/hooks/useCreateOrder'
import { ORDER_LIST_ROUTE } from '@app/containers/Orders/constants/order-routes.constants'
import useGetOrder from '@app/containers/Orders/hooks/useGetOrder'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useUpdateOrder from '@app/containers/Orders/hooks/useUpdateOrder'
import { orderQueryKey } from '@app/containers/Orders/constants/order.query-key'
import { toast } from 'react-toastify'
import { orderSchema, orderDetailSchema } from '@app/containers/Orders/constants/order.schemas'
import useGetCustomers from '@app/containers/Customers/hooks/useGetCustomers'
import DatePicker from '@app/components/DatePicker'
import Detail from '@app/containers/Orders/OrderDetail/components/Detail'
import { PlusIcon } from '@radix-ui/react-icons'
import PageFooter from '@app/components/Page/PageFooter'
import PageContent from '@app/components/Page/PageContent'
import NumberInput from '@app/components/NumberInput'
import Combobox from '@app/components/Combobox'
import useCheckDeliveryDate from '@app/containers/Orders/hooks/useCheckDeliveryDate'
import classNames from 'classnames'

type OrderValue = z.infer<typeof orderSchema>

const defaultValues: DefaultValues<OrderValue> = {
  code: '',
  customer: null,
  detail: [],
  projectValue: 0,
  projectEndDate: undefined,
  projectStartDate: undefined
}

type OrderDetailValue = z.infer<typeof orderDetailSchema>

const defaultOrderDetailValues: DefaultValues<OrderDetailValue> = {
  quantity: 0,
  product: undefined,
  id: null
}

const OrderDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...defaultValues
    }
  })
  const {
    append: orderDetailAppend,
    remove: orderDetailRemove,
    fields: orderDetailFields
  } = useFieldArray({
    control: form.control,
    name: 'detail'
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeleteOrders, isPending: isDeletingOrders } = useDeleteOrders()
  const { mutate: mutateCreateOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { mutate: mutateUpdateOrder, isPending: isUpdatingOrder } = useUpdateOrder()
  const { mutate: mutateCheckDeliveryDate, isPending: isCheckingDeliveryDate } = useCheckDeliveryDate()

  const orderDetail = useWatch({
    control: form.control,
    name: 'detail'
  })

  const onSubmit = (values: z.infer<typeof orderSchema>) => {
    if (isEdit) {
      mutateUpdateOrder(
        {
          ...values,
          id: id as string
        },
        {
          onSuccess: async () => {
            toast.success(`Update order ${order?.data.code} successfully`)
            await queryClient.invalidateQueries({ queryKey: [orderQueryKey.getOrder(id as string)[0]] })
            await queryClient.invalidateQueries({ queryKey: [orderQueryKey.getAllOrders()[0]] })
          }
        }
      )
    } else {
      mutateCreateOrder(
        {
          ...values
        },
        {
          onSuccess: async () => {
            toast.success(`Create order successfully`)
            router.push(ORDER_LIST_ROUTE)
            await queryClient.invalidateQueries({ queryKey: [orderQueryKey.getAllOrders()[0]] })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeleteOrders(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete order ${order?.data.code} successfully`)
          router.push(ORDER_LIST_ROUTE)
          await queryClient.invalidateQueries({ queryKey: [orderQueryKey.getAllOrders()[0]] })
        }
      }
    )
  }

  const handleCheckDeliveryDate = () => {
    const payload: Record<string, number> = {}

    orderDetail.map((detail) => {
      payload[`${detail.product.code}`] = detail.quantity
    })

    mutateCheckDeliveryDate(payload, {
      onSuccess: (res) => {
        if (res) {
          setDeliveryDate(res.data)
        }
      }
    })
  }

  const { data: order, isLoading: isGettingOrder } = useGetOrder({ id: id as string })
  const { data: customers, isLoading: isGettingCustomers } = useGetCustomers()
  const customerOptions = generateMultiSelectOptions({
    data: customers?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })

  useEffect(() => {
    if (order?.data) {
      const { code, customer, detail, projectStartDate, projectEndDate, projectValue } = order.data

      reset({
        detail,
        projectEndDate,
        projectStartDate,
        projectValue,
        code,
        customer
      })
    }
  }, [order, isEdit, customers])

  return (
    <Form {...form}>
      <BackDrop isLoading={isGettingOrder || isGettingCustomers} />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className={classNames(['flex gap-2', { 'mb-0': !!deliveryDate }, { 'mb-4': !deliveryDate }])}>
            <Typography variant='h3'>{isEdit ? `Edit Order ${order?.data?.code}` : 'Create Order'}</Typography>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleCheckDeliveryDate}
              isLoading={isCheckingDeliveryDate}
              disabled={isCheckingDeliveryDate || !orderDetail.length}
            >
              <TruckIcon />
            </Button>
          </div>
          {deliveryDate && (
            <div className='mb-4'>
              <Typography variant='small' className='text-primary'>
                The order can be delivered on: {new Date(deliveryDate).toLocaleString()}
              </Typography>
            </div>
          )}
          <div className='flex desktop:flex-row tablet:flex-row mobile:flex-col mt-4 gap-8 desktop:w-1/2 tablet:w-full mobile:w-full'>
            <div className='space-y-4  desktop:w-1/2 tablet:w-1/2 mobile:w-full'>
              <FormField
                control={form.control}
                name='code'
                label={'Code'}
                renderComponent={({ field }) => <Input placeholder='Order code' {...field} />}
              />
              <FormField
                control={form.control}
                name='customer'
                label={'Customer'}
                renderComponent={({ field }) => (
                  <Combobox
                    onValueChange={field.onChange}
                    value={field.value}
                    options={customerOptions}
                    name={'customer'}
                    placeholder={'Select customer'}
                    valueKey='id'
                  />
                )}
              />
              <FormField
                control={form.control}
                name='projectValue'
                label={'Project value'}
                renderComponent={({ field }) => <NumberInput {...field} placeholder='Input project value' {...field} />}
              />
            </div>
            <div className='space-y-4  desktop:w-1/2 tablet:w-1/2 mobile:w-full'>
              <FormField
                control={form.control}
                name='projectStartDate'
                label={'Project start date'}
                renderComponent={({ field }) => (
                  <DatePicker
                    value={field?.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='projectEndDate'
                label={'Project end date'}
                renderComponent={({ field }) => (
                  <DatePicker
                    value={field?.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-8 desktop:w-1/2 tablet:w-full mobile:w-full'>
            <div className='mb-4 flex justify-start gap-4 items-center'>
              <Typography className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Order details
              </Typography>
              <Button
                onClick={() => orderDetailAppend(defaultOrderDetailValues as any)}
                type='button'
                variant='ghost'
                size='sm'
              >
                <PlusIcon />
              </Button>
            </div>
            {orderDetailFields.map((orderDetailField, index) => (
              <div
                className='flex mb-4 items-start justify-between border border-neutral-200 rounded-sm p-2 pb-3'
                key={orderDetailField.id}
              >
                <Detail control={form.control} index={index} />
                <Button
                  onClick={() => orderDetailRemove(index)}
                  variant='ghost'
                  size='icon'
                  className='rounded-full hover:bg-primary hover:text-white text-primary dark:text-white'
                >
                  <XIcon size={15} />
                </Button>
              </div>
            ))}
            <div className='flex justify-center'>
              <Button onClick={() => orderDetailAppend(defaultOrderDetailValues as any)} type='button' size='sm'>
                <PlusIcon />
              </Button>
            </div>
          </div>
        </PageContent>
        <PageFooter>
          <div className='flex gap-4'>
            {isEdit && (
              <Button
                variant='destructive'
                color='red'
                isLoading={isCreatingOrder || isDeletingOrders || isUpdatingOrder}
                onClick={() => setOpenDialogDelete(true)}
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingOrder || isDeletingOrders || isUpdatingOrder}
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

export default OrderDetail
