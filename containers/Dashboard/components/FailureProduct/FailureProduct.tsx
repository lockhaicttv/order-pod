import { Card, CardContent } from '@app/components/ui/card'
import { ProductIssue } from '@app/containers/Dashboard/types/dashboard.types'
import ReactECharts, { EChartsOption } from 'echarts-for-react'
import { DEFAULT_CHART_COLOR_SCHEMA } from '@app/constants/chart.constants'
import { useBreakpoint } from '@app/hooks/useBreakpoint'

interface Props {
  data?: ProductIssue[]
}
const FailureProduct = ({ data }: Props) => {
  const { downTablet } = useBreakpoint('tablet')

  const processData = (data: ProductIssue[]) => {
    const seriesData: EChartsOption['series']['data'] = []
    const xAxisLabelItem: string[] = []

    data.forEach((item, index) => {
      seriesData.push({
        value: parseFloat(item.numbers.toFixed(2)),
        itemStyle: {
          color: DEFAULT_CHART_COLOR_SCHEMA[index % DEFAULT_CHART_COLOR_SCHEMA.length]
        }
      })
      xAxisLabelItem.push(item.name)
    })

    return {
      title: {
        text: 'Failure Product',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xAxisLabelItem,
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
          name: 'Amount',
          type: 'bar',
          data: seriesData,
          barWidth: '40px'
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 1,
          end: 50
        }
      ]
    }
  }

  return (
    <Card className='h-full'>
      <CardContent className='p-2'>
        <div className='w-full'>
          <ReactECharts option={processData(data || [])} />
        </div>
      </CardContent>
    </Card>
  )
}

export default FailureProduct
