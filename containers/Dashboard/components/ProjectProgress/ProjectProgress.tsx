import { Card, CardContent } from '@app/components/ui/card'
import { OrderProcess } from '@app/containers/Dashboard/types/dashboard.types'
import { DEFAULT_CHART_COLOR_SCHEMA } from '@app/constants/chart.constants'
import ReactECharts, { EChartsOption } from 'echarts-for-react'

interface Props {
  data: OrderProcess[] | undefined
}
const ProjectProgress = ({ data }: Props) => {
  const processData = (data: OrderProcess[]) => {
    const seriesData: EChartsOption['series']['data'] = []
    const yAxisLabelItem: string[] = []

    data.forEach((item, index) => {
      seriesData.push({
        value: item.progressing * 100,
        itemStyle: {
          color: DEFAULT_CHART_COLOR_SCHEMA[index % DEFAULT_CHART_COLOR_SCHEMA.length]
        }
      })
      yAxisLabelItem.push(item.order)
    })

    return {
      title: {
        text: 'Project Processes',
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
        type: 'value',
        boundaryGap: [0, 0.01],
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: yAxisLabelItem
      },
      series: [
        {
          name: 'Process',
          type: 'bar',
          data: seriesData
        }
      ]
    }
  }

  return (
    <Card>
      <CardContent className='p-4'>
        <div className='w-full'>
          <ReactECharts option={processData(data || [])} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectProgress
