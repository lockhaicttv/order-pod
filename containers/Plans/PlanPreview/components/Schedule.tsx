import React, { ReactNode } from 'react'
import { Input } from '@app/components/ui/input'
import Select from '@app/components/Select'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import { Schedule as ScheduleProps } from '@app/containers/Plans/types/plan.types'
import useGetOrders from '@app/containers/Orders/hooks/useGetOrders'
import useGetCustomers from '@app/containers/Customers/hooks/useGetCustomers'
import useGetTools from '@app/containers/Tools/hooks/useGetTools'
import MultiSelectHook from '@app/components/Form/MultiSelectHook/MultiSelectHook'
import { Tool } from '@app/containers/Tools/types/tool.types'
import useGetMachines from '@app/containers/Machines/hooks/useGetMachines'
import FormField from '@app/components/Form/FormField'
import { useFormContext } from 'react-hook-form'
import InfoWithIcon from '@app/components/InfoWithIcon'
import { BadgeAlertIcon, Clock2Icon, PackageIcon, UserIcon, UserRoundIcon, WeightIcon, WrenchIcon } from 'lucide-react'
import { CalendarIcon, GearIcon } from '@radix-ui/react-icons'
import { Separator } from '@app/components/ui/separator'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@app/utils/formatDate'

interface Props {
  schedule: ScheduleProps
}
const Schedule = ({ schedule }: Props) => {
  return (
    <div className='w-full mt-4'>
      <Separator />
      <div className='flex gap-4 justify-start'>
        <InfoWithIcon
          icon={<PackageIcon size={16} />}
          info={`${schedule.outputProduct?.code} - ${schedule.outputProduct?.name}`}
          title={'Output product'}
        />
      </div>
      <div className='flex w-full gap-4'>
        <InfoWithIcon icon={<CalendarIcon fontSize={16} />} info={schedule.order?.code} title={'Order'} />
        <InfoWithIcon icon={<UserIcon size={16} />} info={schedule.customer?.name} title={'Customer'} />
        <InfoWithIcon icon={<UserRoundIcon size={16} />} info={schedule.employee} title={'Employee'} />
        <InfoWithIcon
          icon={<WeightIcon fontSize={16} />}
          info={schedule.weightQuota.toFixed(3)}
          title={'Weight Quota'}
        />
      </div>
      <div className='flex gap-4 justify-start'>
        <InfoWithIcon
          icon={<WrenchIcon size={16} />}
          info={schedule.tools?.map((tool) => tool.code).join(', ')}
          title={'Tools'}
        />
      </div>
      <div className='flex gap-4'>
        <InfoWithIcon
          icon={<GearIcon fontSize={16} />}
          info={schedule.machines?.map((machine) => machine.code).join(', ')}
          title={'Machines'}
        />
      </div>
      <div className='flex gap-4'>
        <InfoWithIcon
          icon={<Clock2Icon size={16} />}
          info={[dayjs(schedule.startDate).format(DATE_FORMAT), dayjs(schedule.endDate).format(DATE_FORMAT)].join(
            ' - '
          )}
          title={'Machines'}
        />
      </div>
    </div>
  )
}

export default Schedule

interface LabelValueItemProps {
  label: string
  value: string | number
  icon?: ReactNode
}

const LabelValueItem = ({ value, label }: LabelValueItemProps) => {
  return (
    <div>
      {label}: {' ' + value}
    </div>
  )
}
