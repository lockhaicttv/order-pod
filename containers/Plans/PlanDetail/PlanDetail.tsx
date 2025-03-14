'use client'
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
import { useQueryClient } from '@tanstack/react-query'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { PLAN_LIST_ROUTE } from '@app/containers/Plans/constants/plan-routes.constants'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import { planQueryKey } from '@app/containers/Plans/constants/plan.query-key'
import { toast } from 'react-toastify'
import { planDetailSchema, planSchema, scheduleSchema } from '@app/containers/Plans/constants/plan.schemas'
import useGetCustomers from '@app/containers/Customers/hooks/useGetCustomers'
import { PlusIcon } from '@radix-ui/react-icons'
import PageFooter from '@app/components/Page/PageFooter'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import useGetPlanDetail from '@app/containers/Plans/hooks/useGetPlanDetail'
import useCreatePlanDetail from '@app/containers/Plans/hooks/useCreatePlanDetail'
import useUpdatePlanDetail from '@app/containers/Plans/hooks/useUpdatePlanDetail'
import useDeletePlanDetails from '@app/containers/Plans/hooks/useDeletePlanDetails'
import Schedule from '@app/containers/Plans/PlanDetail/components/Schedule'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import useGetOrders from '@app/containers/Orders/hooks/useGetOrders'
import useGetTools from '@app/containers/Tools/hooks/useGetTools'
import useGetMachines from '@app/containers/Machines/hooks/useGetMachines'
import PageContent from '@app/components/Page/PageContent'
import Combobox from '@app/components/Combobox'

const defaultValues: DefaultValues<z.infer<typeof planDetailSchema>> = {
  id: '',
  stage: undefined,
  schedule: []
}

const defaulScheduleValue: DefaultValues<z.infer<typeof scheduleSchema>> = {
  id: null,
  startDate: new Date().toISOString(), // ISO 8601 date string
  endDate: new Date().toISOString(), // ISO 8601 date string
  projectStartDate: new Date().toISOString(), // ISO 8601 date string
  projectEndDate: new Date().toISOString(), // ISO 8601 date string
  order: undefined,
  customer: undefined,
  orderDetail: undefined,
  employee: 0,
  machines: [],
  tools: [],
  outputProduct: undefined,
  weightQuota: 0
}

const PlanDetail = () => {
  const { id } = useParams()
  const { planId } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof planDetailSchema>>({
    resolver: zodResolver(planDetailSchema),
    defaultValues: {
      ...defaultValues
    }
  })
  const {
    append: scheduleAppend,
    remove: scheduleRemove,
    fields: scheduleFields
  } = useFieldArray({
    control: form.control,
    name: 'schedule'
  })

  const { handleSubmit, reset } = form
  const { mutate: mutateDeletePlanDetails, isPending: isDeletingPlanDetails } = useDeletePlanDetails()
  const { mutate: mutateCreatePlanDetail, isPending: isCreatingPlanDetail } = useCreatePlanDetail()
  const { mutate: mutateUpdatePlanDetail, isPending: isUpdatingPlanDetail } = useUpdatePlanDetail()

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const onSubmit = (values: z.infer<typeof planDetailSchema>) => {
    if (isEdit) {
      mutateUpdatePlanDetail(
        {
          updatePlanDetailPayload: {
            ...values,
            id: id as string
          },
          updatePlanDetailParams: {
            planId: planId as string
          }
        },
        {
          onSuccess: async () => {
            toast.success(`Update plan ${planDetail?.data.id} successfully`)
            await queryClient.invalidateQueries({ queryKey: [planQueryKey.getPlanDetailById(id as string)[0]] })
          }
        }
      )
    } else {
      mutateCreatePlanDetail(
        {
          createPlanDetailPayload: {
            ...values
          },
          createPlanDetailParams: {
            planId: planId as string
          }
        },
        {
          onSuccess: async () => {
            toast.success(`Create plan successfully`)
            router.push(PLAN_LIST_ROUTE)
            await queryClient.invalidateQueries({ queryKey: [planQueryKey.getAllPlans()[0]] })
          }
        }
      )
    }
  }
  const handleDelete = () => {
    mutateDeletePlanDetails(
      { id: [id as string] },
      {
        onSuccess: async () => {
          toast.success(`Delete plan detail ${planDetail?.data.id} successfully`)
          router.push(PLAN_LIST_ROUTE)
          await queryClient.invalidateQueries({ queryKey: [planQueryKey.getAllPlans()[0]] })
        }
      }
    )
  }

  const { data: stages } = useGetStages()
  const stageOptions = generateMultiSelectOptions({
    data: stages?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  const { data: planDetail, isLoading: isGettingPlanDetail } = useGetPlanDetail({ id: id as string })
  const { data: customers, isLoading: isGettingCustomers } = useGetCustomers()
  const { data: products, isLoading: isGettingProducts } = useGetProducts()
  const { data: orders, isLoading: isGettingOrders } = useGetOrders()
  const { data: tools, isLoading: isGettingTools } = useGetTools()
  const { data: machines, isLoading: isGettingMachines } = useGetMachines()

  useEffect(() => {
    if (planDetail?.data) {
      const { stage, schedule } = planDetail.data

      reset({
        stage,
        schedule
      })
    }
  }, [planDetail, isEdit, customers, products, orders, tools, machines])

  return (
    <Form {...form}>
      <BackDrop
        isLoading={
          isGettingPlanDetail ||
          isGettingCustomers ||
          isCreatingPlanDetail ||
          isUpdatingPlanDetail ||
          isGettingMachines ||
          isGettingProducts ||
          isGettingTools ||
          isGettingOrders
        }
      />
      <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
        <PageContent>
          <div className='mb-4'>
            <Typography variant='h3'>
              {isEdit ? `Edit Plan Detail ${planDetail?.data.stage.code}` : 'Create Plan Detail'}
            </Typography>
          </div>
          <div className='flex mt-4 gap-8'>
            <div className='space-y-4 desktop:w-1/6'>
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
                    valueKey='id'
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-8 desktop:w-1/2'>
            <div className='mb-4 flex justify-start gap-4 items-center'>
              <Typography className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Schedule details
              </Typography>
              <Button
                onClick={() => scheduleAppend(defaulScheduleValue as any)}
                type='button'
                variant='ghost'
                size='sm'
              >
                <PlusIcon />
              </Button>
            </div>
            {scheduleFields.map((planDetailField, index) => (
              <div
                className='flex space-x-2 justify-between mb-4 items-start border border-solid border-neutral-200 rounded-sm p-2 pl-4 pb-4'
                key={planDetailField.id}
              >
                <div className='w-11/12'>
                  <Schedule index={index} />
                </div>

                <Button
                  onClick={() => scheduleRemove(index)}
                  variant='ghost'
                  size='icon'
                  className='rounded-full hover:bg-primary hover:text-white text-primary dark:text-white'
                >
                  <XIcon size={15} />
                </Button>
              </div>
            ))}
            <div className='flex justify-center'>
              <Button onClick={() => scheduleAppend(defaulScheduleValue as any)} type='button' size='sm'>
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
                isLoading={isCreatingPlanDetail || isDeletingPlanDetails || isUpdatingPlanDetail}
                onClick={() => setOpenDialogDelete(true)}
              >
                <Trash2Icon className='mr-2' />
                DELETE
              </Button>
            )}
            <Button
              isLoading={isCreatingPlanDetail || isDeletingPlanDetails || isUpdatingPlanDetail}
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

export default PlanDetail
