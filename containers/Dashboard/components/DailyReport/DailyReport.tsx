import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import { ProducingOfStages } from '@app/containers/Dashboard/types/dashboard.types'
import ReactECharts, { EChartsOption } from 'echarts-for-react'
import { DEFAULT_CHART_COLOR_SCHEMA } from '@app/constants/chart.constants'

interface Props {
  producingQuantityOfStages?: ProducingOfStages[]
  producingWeightOfStages?: ProducingOfStages[]
}

const DailyReport = ({ producingQuantityOfStages, producingWeightOfStages }: Props) => {
  function generateBarGroupOption(data: ProducingOfStages[]) {
    const planValues: number[] = []
    const realValues: number[] = []
    const xAxisLabelItem: string[] = []

    data.forEach((item) => {
      xAxisLabelItem.push(item.name)
      planValues.push(parseFloat(item.plan.toFixed(2)))
      realValues.push(parseFloat(item.real.toFixed(2)))
    })

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
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
        data: xAxisLabelItem,
        axisLabel: {
          rotate: 30,
          interval: 0
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
            color: DEFAULT_CHART_COLOR_SCHEMA[0],
            width: 20
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
            color: DEFAULT_CHART_COLOR_SCHEMA[3]
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
          xAxisIndex: [0],
          start: 1,
          end: 100
        }
      ]
    }

    return option
  }

  return (
    <Card>
      <Tabs defaultValue='weight'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-center uppercase'>Báo cáo sản xuất trong ngày </CardTitle>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='weight'>Khối lượng</TabsTrigger>
            <TabsTrigger value='amount'>Số lượng</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className='pb-2'>
          <TabsContent value='weight'>
            <div className='h-full w-full'>
              <ReactECharts
                option={{
                  title: {
                    text: 'Product Weight Of Stages',
                    left: 'center'
                  },
                  ...generateBarGroupOption(producingWeightOfStages || [])
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value='amount'>
            <div className='h-full w-full'>
              <ReactECharts
                option={{
                  title: {
                    text: 'Product Quantity Of Stages',
                    left: 'center'
                  },
                  ...generateBarGroupOption(producingQuantityOfStages || [])
                }}
              />
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}

export default DailyReport

const exampleData1 = [
  {
    stage: 'Cán ép',
    a: 500,
    b: 800
  },
  {
    stage: 'Cắt',
    a: 1000,
    b: 200
  },
  {
    stage: 'Hoàn thiện',
    a: 234,
    b: 324
  }
]

const exampleData2 = [
  {
    stage: 'Cán ép',
    a: 2000,
    b: 800
  },
  {
    stage: 'Cắt',
    a: 1800,
    b: 900
  },
  {
    stage: 'Hoàn thiện',
    a: 2499,
    b: 1234
  }
]
