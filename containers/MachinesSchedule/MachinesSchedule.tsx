import { Scheduler, SchedulerData } from '@bitnoi.se/react-scheduler'
import React, { useState } from 'react'
import theme from '@app/utils/theme'
import styled from 'styled-components'
import { Typography } from '@app/components/ui/typography'
import { useGetFetchQuery } from '@app/hooks/useGetFetchQuery'
import { Order } from '@app/types/orders.types'
import useGetMachinesSchedule from '@app/containers/MachinesSchedule/hooks/useGetMachinesSchedule'
import { useParams, usePathname, useRouter } from 'next/navigation'
import Combobox from '@app/components/Combobox'
import useGetOrders from '@app/containers/Orders/hooks/useGetOrders'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
const MachinesSchedule = () => {
  const [filterButtonState, setFilterButtonState] = useState(0)
  const { orderCode } = useParams()
  const decodedOrderCode = decodeURIComponent(orderCode as string)

  const router = useRouter()
  const pathname = usePathname()

  const { data: machinesSchedule } = useGetMachinesSchedule({
    orders: [orderCode as string],
    startDate: new Date().toISOString()
  })

  const scheduleData: SchedulerData =
    machinesSchedule?.map((machine) => {
      return {
        id: machine.name,
        label: {
          title: machine.name,
          subtitle: '',
          icon: ''
        },
        data: machine.time.map((time, index) => {
          const { startDate, endDate, orderCode, customer } = time
          return {
            id: Math.random().toString(),
            bgColor: theme.colors.nivo[index + 1],
            title: orderCode,
            startDate: new Date(startDate),
            endDate: new Date(new Date(endDate)),
            occupancy: 3600 * 8,
            description: customer
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
        <Typography variant='h3'>Machine Schedule</Typography>
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

export default MachinesSchedule

const ScheduleStyled = styled.div`
  .jwOjdZ {
    display: none;
  }
`
