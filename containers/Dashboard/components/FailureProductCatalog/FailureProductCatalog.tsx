import { Card, CardContent } from '@app/components/ui/card'
import ReactECharts, { EChartsOption } from 'echarts-for-react'
import { DEFAULT_CHART_COLOR_SCHEMA } from '@app/constants/chart.constants'
interface Props {
  data?: Record<string, number>
}

const FailureProductCatalog = ({ data }: Props) => {
  function processData(input?: Record<string, number>) {
    if (!input) return {}

    const seriesData: EChartsOption['series']['data'] = []
    let index = 0
    for (const [label, value] of Object.entries(input)) {
      index++
      seriesData.push({
        name: label,
        value,
        itemStyle: {
          color: DEFAULT_CHART_COLOR_SCHEMA[index % DEFAULT_CHART_COLOR_SCHEMA.length]
        }
      })
    }

    return {
      title: {
        text: 'Failure Product Catalog',
        left: 'center'
      },
      legend: {
        bottom: 0
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          data: seriesData,
          label: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  return (
    <Card className='h-full'>
      <CardContent className='p-4'>
        <div className='w-full'>
          <ReactECharts option={processData(data)} />
        </div>
      </CardContent>
    </Card>
  )
}

export default FailureProductCatalog

const exampleData = [
  {
    id: 'Thiếu cao su',
    label: 'Thiếu cao su',
    value: 50
  },
  {
    id: 'Bavia chết',
    label: 'Bavia chết',
    value: 200
  },
  {
    id: 'Lẹm',
    label: 'Lẹm',
    value: 100
  },
  {
    id: 'Tỉa',
    label: 'Tỉa',
    value: 350
  }
]
