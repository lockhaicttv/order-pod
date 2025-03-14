import { Card, CardContent } from '@app/components/ui/card'
import { DistributedResource } from '@app/containers/Dashboard/types/dashboard.types'
import { useBreakpoint } from '@app/hooks/useBreakpoint'
import { useTheme } from 'next-themes'
import ReactECharts, { EChartsOption } from 'echarts-for-react'

interface Props {
  data: DistributedResource[] | undefined
}
const ResourceAllocation = ({ data }: Props) => {
  const { downTablet } = useBreakpoint('tablet')
  const { theme } = useTheme()

  function generateBarGroupOption(data: DistributedResource[]) {
    const categories = data.map((item) => item.name)
    const planValues = data.map((item) => item.plan)
    const realValues = data.map((item) => item.real)

    const option: EChartsOption = {
      title: {
        text: 'Resource Allocation',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Plan', 'Real'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          rotate: 30,
          interval: 0,
          show: !downTablet
        },
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax'
      },
      series: [
        {
          name: 'Plan',
          type: 'bar',
          data: planValues,
          itemStyle: {
            color: '#91cc75' // Customize bar color for 'Plan'
          },
          label: {
            show: true,
            position: 'top'
          },
          barWidth: '40px'
        },
        {
          name: 'Real',
          type: 'bar',
          data: realValues,
          itemStyle: {
            color: '#fac858' // Customize bar color for 'Real'
          },
          label: {
            show: true,
            position: 'top'
          },
          barWidth: '40px'
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0]
          // start: 1,
          // end: 35
        }
      ]
    }

    return option
  }

  const chartOption = generateBarGroupOption(data || [])

  return (
    <Card>
      <CardContent className='p-4'>
        <div className='w-full'>
          <ReactECharts option={chartOption} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ResourceAllocation
