import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { PLAN_DETAIL_CREATE_ROUTE, PLAN_DETAIL_EDIT_ROUTE } from '@app/containers/Plans/constants/plan-routes.constants'
import { PlAN_STATUS } from '@app/containers/Plans/types/plan.types'
import useDeletePlans from '@app/containers/Plans/hooks/useDeletePlans'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { planQueryKey } from '@app/containers/Plans/constants/plan.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useGetOrdersByStatus from '@app/containers/Orders/hooks/useGetOrdersByStatus'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useGetPlanByOrderCodes from '@app/containers/Plans/hooks/useGetPlanByOrderCodes'
import { Label } from '@app/components/ui/label'
import * as React from 'react'
import Schedule from '@app/containers/Plans/PlanPreview/components/Schedule'
import { DeleteIcon, PencilIcon } from 'lucide-react'
import { Typography } from '@app/components/ui/typography'
import useUpdatePlanStatus from '@app/containers/Plans/hooks/useUpdatePlanStatus'
import { orderQueryKey } from '@app/containers/Orders/constants/order.query-key'
import Combobox from '@app/components/Combobox'
import { ticketPlanningQueryKey } from '@app/containers/TicketPlanning/constants/ticket-planning.query-key'

const PlanPreview = () => {
  const { orderCode } = useParams()
  const decodedOrderCode = decodeURIComponent(orderCode as string)

  const pathname = usePathname()
  const router = useRouter()
  const { mutate: mutateDeletePlans } = useDeletePlans()
  const queryClient = useQueryClient()

  const { mutate: mutateUpdatePlanStatus, isPending: isUpdatingPlanStatus } = useUpdatePlanStatus()

  const { data: executingOrders, isLoading: isGettingExecutingOrders } = useGetOrdersByStatus({
    status: 'executing'
  })
  const { data: planningOrders, isLoading: isGettingPlanningOrders } = useGetOrdersByStatus({
    status: 'planning'
  })

  const executingOrderOptions = generateMultiSelectOptions({
    data: executingOrders?.data,
    labelKey: 'code',
    valueKey: 'code',
    valueAsObject: false
  })

  const planningOrderOptions = generateMultiSelectOptions({
    data: planningOrders?.data,
    labelKey: 'code',
    valueKey: 'code',
    valueAsObject: false
  })

  const handleDelete = (planDetailId: string) => {
    mutateDeletePlans(
      {
        id: [planDetailId]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete plan ${planDetailId} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === planQueryKey.getPlanByListOrderId([decodedOrderCode as string])[0]
          })
        }
      }
    )
  }

  const handleApprovePlan = () => {
    mutateUpdatePlanStatus(
      {
        planId: plan?.data.id || '',
        planStatus: PlAN_STATUS.USING
      },
      {
        onSuccess: async () => {
          toast.success(`Planning is using`)
          await queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === planQueryKey.getPlanByListOrderId([decodedOrderCode as string])[0] ||
              query.queryKey[0] === orderQueryKey.getAllOrders()[0] ||
              query.queryKey[0] === ticketPlanningQueryKey.getAllTickets()[0]
          })
        }
      }
    )
  }

  const handleChangeSelectedOrderCode = (value?: string | null) => {
    router.push(
      decodedOrderCode === undefined || decodedOrderCode === 'undefined'
        ? `${pathname}/${value}`
        : pathname.replace(decodedOrderCode, value || '')
    )
  }

  const { data: plan, isLoading: isGettingPlans } = useGetPlanByOrderCodes({
    list: decodedOrderCode === undefined || decodedOrderCode === 'undefined' ? [] : [decodedOrderCode]
  })

  return (
    <Page>
      <BackDrop
        isLoading={isGettingPlans || isGettingPlanningOrders || isGettingExecutingOrders || isUpdatingPlanStatus}
      />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Plan Detail' totalItems={plan?.data?.detail.length || 0} />
        {!!plan?.data && (
          <Button
            className='flex gap-2'
            onClick={() => {
              router.push(`${PLAN_DETAIL_CREATE_ROUTE(plan?.data?.id)}`)
            }}
          >
            <PlusIcon />
            Add Stage
          </Button>
        )}
      </div>
      <div className='space-y-4 flex justify-between items-end'>
        <div className='flex space-x-2 '>
          <div className='w-[200px] mt-4'>
            <Label className='text-green-500'>Planning Orders</Label>
            <Combobox
              name={'orders'}
              options={planningOrderOptions}
              value={
                planningOrderOptions.filter((option) => option.value === decodedOrderCode).length
                  ? decodedOrderCode
                  : ''
              }
              onValueChange={handleChangeSelectedOrderCode}
              // selectTriggerClassname='bg-background'
              placeholder='Select an order'
            />
          </div>
          <div className='w-[200px] mt-4'>
            <Label className='text-blue-500'>Executing Orders</Label>
            <Combobox
              name={'orders'}
              options={executingOrderOptions}
              value={
                executingOrderOptions.filter((option) => option.value === decodedOrderCode).length
                  ? decodedOrderCode
                  : ''
              }
              onValueChange={handleChangeSelectedOrderCode}
              placeholder='Select an order'
            />
          </div>
        </div>

        <Button
          className='bg-green-500'
          disabled={plan?.data?.status === PlAN_STATUS.USING || !decodedOrderCode}
          size='lg'
          isLoading={isUpdatingPlanStatus}
          onClick={() => handleApprovePlan()}
        >
          {plan?.data?.status === PlAN_STATUS.PLANNING ? 'Approve Plan' : 'Plan Approved'}
        </Button>
      </div>
      {!plan?.data && (
        <div className='flex justify-center items-center mt-32'>
          <Typography className='font-medium' variant={'h4'}>
            Please choose an order to see its plan
          </Typography>
        </div>
      )}
      <div className='mt-8 grid desktop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-4'>
        {plan?.data?.detail.map((planDetail) => {
          return (
            <div
              key={planDetail.id}
              className='flex space-x-2 justify-between mb-4 items-start border border-solid border-neutral-200 dark:border-border rounded-sm p-2 pr-0 pl-4 pb-4 bg-background'
            >
              <div className='w-11/12'>
                <div>
                  <Label className='text-primary dark:text-white'>
                    {planDetail.stage?.name} - {planDetail.stage?.code}
                  </Label>
                </div>
                <div>
                  {planDetail.schedule.map((scheduleItem) => (
                    <Schedule key={scheduleItem.id} schedule={scheduleItem} />
                  ))}
                </div>
              </div>
              <div className=' flex flex-col justify-end items-center px-1'>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => handleDelete(planDetail.id)}
                  disabled={plan?.data?.status === PlAN_STATUS.USING}
                  isLoading={isUpdatingPlanStatus}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => router.push(PLAN_DETAIL_EDIT_ROUTE(plan.data.id, planDetail.id))}
                  disabled={plan?.data?.status === PlAN_STATUS.USING}
                  isLoading={isUpdatingPlanStatus}
                >
                  <PencilIcon />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </Page>
  )
}

export default PlanPreview
