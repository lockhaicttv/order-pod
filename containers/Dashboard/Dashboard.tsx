import ResourceAllocation from '@app/containers/Dashboard/components/ResourceAllocation'
import ProjectProgress from '@app/containers/Dashboard/components/ProjectProgress'
import BasicInformationBlock from '@app/containers/Dashboard/components/BasicInformationBlock'
import { DEFAULT_CHART_COLOR_SCHEMA } from '@app/constants/chart.constants'
import TicketProgress from '@app/containers/Dashboard/components/TicketProgress'
import WorkingProgress from '@app/containers/Dashboard/components/WorkingProgress'
import FailureProduct from '@app/containers/Dashboard/components/FailureProduct'
import FailureProductCatalog from '@app/containers/Dashboard/components/FailureProductCatalog'
import DailyReport from '@app/containers/Dashboard/components/DailyReport'
import DatePicker from '@app/components/DatePicker'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useGetDashboard from '@app/containers/Dashboard/hooks/useGetDashboard'
import BackDrop from '@app/components/BackDrop/BackDrop'
import dayjs from 'dayjs'
import ModalExportData from '@app/containers/Dashboard/components/ModalExportData'

const Dashboard = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlSearchParams = new URLSearchParams(searchParams?.toString())
  const date = urlSearchParams.get('date')
  const pathname = usePathname()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const handleChangeDate = (date?: Date) => {
    if (date) {
      setSelectedDate(date)
      urlSearchParams.set('date', date?.toISOString())
      router.push(`${pathname}?${urlSearchParams.toString()}`)
    }
  }

  const { data: dashboard, isLoading } = useGetDashboard({ date: selectedDate?.toISOString() || '' })

  useEffect(() => {
    if (!dayjs(date).isSame(selectedDate, 'day')) {
      setSelectedDate(date ? new Date(date) : new Date())
    }
  }, [])

  return (
    <div className='flex flex-col mobile:p-4 space-y-4'>
      <BackDrop isLoading={isLoading} />
      <div className='flex justify-between'>
        <div className='w-[200px]'>
          <DatePicker onChange={handleChangeDate} value={new Date(date || new Date().toISOString())} />
        </div>
        <ModalExportData />
      </div>

      <div className='grid gap-4 justify-between mobile:grid-cols-2 tabletLandscape:grid-cols-4'>
        <BasicInformationBlock
          label={'Số đơn hàng'}
          value={dashboard?.data.openOrder || 0}
          color={DEFAULT_CHART_COLOR_SCHEMA[0]}
        />
        <BasicInformationBlock
          label={'Số công việc'}
          value={dashboard?.data.numberOfTickets || 0}
          color={DEFAULT_CHART_COLOR_SCHEMA[2]}
        />
        <BasicInformationBlock
          label={'Số giờ cần'}
          value={dashboard?.data.requestWorkingTimes || 0}
          color={DEFAULT_CHART_COLOR_SCHEMA[4]}
        />
        <BasicInformationBlock
          label={'Số người cần'}
          value={dashboard?.data.requestEmployees || 0}
          color={DEFAULT_CHART_COLOR_SCHEMA[5]}
        />
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <div className='w-full'>
          <ResourceAllocation data={dashboard?.data.distributedResouces} />
        </div>
        <div className='w-full'>
          <ProjectProgress data={dashboard?.data.orderProcess} />
        </div>
      </div>
      <div className='flex gap-4 desktop:flex-row tablet:flex-col mobile:flex-col'>
        <div className='w-full desktop:w-1/2'>
          <TicketProgress data={dashboard?.data.workingProcess} />
        </div>
        <div className='w-full desktop:w-1/2'>
          <WorkingProgress data={dashboard?.data.productQuality} />
        </div>
      </div>
      <div>
        <DailyReport
          producingWeightOfStages={dashboard?.data.producingWeightOfStages}
          producingQuantityOfStages={dashboard?.data.producingQuantityOfStages}
        />
      </div>
      <div className='flex gap-4 desktop:flex-row tablet:flex-col mobile:flex-col'>
        <div className='w-full desktop:w-1/2'>
          <FailureProduct data={dashboard?.data.productIssue} />
        </div>
        <div className='w-full desktop:w-1/2'>
          <FailureProductCatalog data={dashboard?.data.issueTypes} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
