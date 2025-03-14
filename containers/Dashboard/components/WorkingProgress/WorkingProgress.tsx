import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { ProductQuality } from '@app/containers/Dashboard/types/dashboard.types'
import ReactECharts from 'echarts-for-react'
import { DEFAULT_CHART_COLOR_SCHEMA } from '@app/constants/chart.constants'

interface Props {
  data?: ProductQuality
}
const WorkingProgress = ({ data }: Props) => {
  const seriesData = [
    {
      id: 'Đạt',
      name: `Đạt ${data?.Pass?.toFixed(3)}`,
      value: data?.Pass || 0,
      itemStyle: {
        color: DEFAULT_CHART_COLOR_SCHEMA[0]
      }
    },
    {
      id: 'Lỗi',
      name: `Lỗi ${data?.Issue?.toFixed(3)}`,
      value: data?.Issue || 0,
      itemStyle: {
        color: DEFAULT_CHART_COLOR_SCHEMA[DEFAULT_CHART_COLOR_SCHEMA.length - 1]
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
        data: seriesData
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

export default WorkingProgress
