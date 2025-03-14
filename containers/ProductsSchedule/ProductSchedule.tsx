import { Scheduler, SchedulerData } from '@bitnoi.se/react-scheduler'
import React, { useState } from 'react'
import theme from '@app/utils/theme'
import styled from 'styled-components'
import { Typography } from '@app/components/ui/typography'
import useGetOrdersSchedule from '@app/containers/ProductsSchedule/hooks/useGetProductSchedule'
import { useParams, usePathname, useRouter } from 'next/navigation'
import useGetOrders from '@app/containers/Orders/hooks/useGetOrders'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import Combobox from '@app/components/Combobox'
import useSearchParams from '@app/hooks/useSearchParams'
import qs from 'qs'
const ProductSchedule = () => {
  const [filterButtonState, setFilterButtonState] = useState(0)
  const { orderCode } = useParams()
  const decodedOrderCode = decodeURIComponent(orderCode as string)

  const router = useRouter()
  const pathname = usePathname()
  const { data: orderSchedules } = useGetOrdersSchedule({
    orders: [orderCode as string],
    startDate: new Date().toISOString()
  })

  const order = orderSchedules?.[0]
  const scheduleData: SchedulerData =
    order?.schedule.map((product) => {
      return {
        id: product.productName,
        label: {
          title: product.productName,
          subtitle: '',
          icon: ''
        },
        data: product.time.map((time, index) => {
          const { startDate, endDate, stageName } = time
          return {
            id: Math.random().toString(),
            bgColor: theme.colors.nivo[index + 1],
            title: stageName,
            startDate: new Date(startDate),
            endDate: new Date(new Date(endDate)),
            occupancy: 3600 * 8,
            description: '' // 8 hours per day
          }
        })
      }
    }) || []

  const { data: orders } = useGetOrders()
  const orderOptions = generateMultiSelectOptions({
    data: orders?.data || [],
    labelKey: 'code',
    valueKey: 'code',
    valueAsObject: false
  })

  return (
    <div className='bg-background p-4 min-h-[80vh]'>
      <div className='mb-4'>
        <Typography variant='h3'>Product Schedule</Typography>
      </div>
      <div className='mb-8 flex gap-2 items-center'>
        <Typography variant='large'>Order:</Typography>
        <div className='w-32'>
          <Combobox
            onValueChange={(value) => router.push(pathname.replace(decodedOrderCode, value as string))}
            value={decodedOrderCode}
            options={orderOptions}
            name={'order'}
            placeholder={'Select order'}
            allowClear={false}
          />
        </div>
      </div>
      <ScheduleStyled className='min-h-[60vh] relative'>
        <Scheduler
          data={scheduleData}
          isLoading={false}
          onFilterData={() => {
            // Some filtering logic...
            setFilterButtonState(1)
          }}
          onClearFilterData={() => {
            // Some clearing filters logic...
            setFilterButtonState(0)
          }}
          config={{
            zoom: 0,
            filterButtonState
          }}
        />
      </ScheduleStyled>
    </div>
  )
}

export default ProductSchedule

const ScheduleStyled = styled.div`
  .jwOjdZ {
    display: none;
  }
`
