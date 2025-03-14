import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { WorkingProcess } from '@app/containers/Dashboard/types/dashboard.types'
import { useBreakpoint } from '@app/hooks/useBreakpoint'
import ReactECharts from 'echarts-for-react'
import { DEFAULT_CHART_COLOR_SCHEMA } from '@app/constants/chart.constants'

interface Props {
  data?: WorkingProcess
}

const TicketProgress = ({ data }: Props) => {
  const { downTablet } = useBreakpoint('tablet')

  const seriData = [
    {
      id: 'Hoàn thành',
      name: `Hoàn thành - ${data?.done}`,
      value: data?.done || 0,
      itemStyle: {
        color: DEFAULT_CHART_COLOR_SCHEMA[0]
      }
    },
    {
      id: 'Đang thực hiện',
      name: `Đang thực hiện - ${data?.doing}`,
      value: data?.doing || 0,
      itemStyle: {
        color: DEFAULT_CHART_COLOR_SCHEMA[2]
      }
    },
    {
      id: 'Chưa thực hiện',
      name: `Chưa thực hiện - ${data?.open}`,
      value: data?.open || 0,
      itemStyle: {
        color: DEFAULT_CHART_COLOR_SCHEMA[4]
      }
    }
  ]

  const option = {
    title: {
      text: 'Ticket Progress'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 0
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['80%', '45%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: seriData
      }
    ]
  }

  return (
    <Card>
      <CardContent className='p-4'>
        <div className='w-full h-full'>
          <ReactECharts option={option} />
        </div>
      </CardContent>
    </Card>
  )
}

export default TicketProgress
