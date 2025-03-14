import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@app/components/ui/navigation-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { formatCurrency } from '@app/utils/formatCurrency'

const Projects = () => {
  return (
    <div className='bg-white p-4 min-h-screen'>
      <div className='flex justify-between'>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Dự án đang thực hiện</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Những dự án tìm kiếm gần đây</NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className='flex gap-4'>
          <Button size='sm'>
            <PlusIcon className='mr-1' />
            New Project
          </Button>
          <Button size='sm' variant='secondary'>
            <PlusIcon className='mr-1' />
            New Quote
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-4 mt-4 gap-8'>
        {projects.map((project, index) => {
          return (
            <div key={index} className='grid-cols-3'>
              <Card>
                <CardHeader className='pb-1 h-20'>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography variant='small'>${formatCurrency(project.agreementValue)}</Typography>
                  <Typography className='mt-2'>Giai đoạn: {project.processingStage}</Typography>
                  <Typography className='mt-4' variant='muted'>
                    Thời gian bắt đầu: {project.startTime}
                  </Typography>
                  <Typography className='mt-2' variant='muted'>
                    Thời gian kết thúc: {project.endDate}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Projects

interface Project {
  startTime: string
  endDate: string
  name: string
  agreementValue: number
  processingStage: number
}

function getRandomProcessingStage(): number {
  return Math.floor(Math.random() * 5) + 1
}

const projects: Project[] = [
  {
    startTime: '2022-06-01',
    endDate: '2023-12-31',
    name: 'Dự án Nâng Cao Năng Suất Trồng Cao Su',
    agreementValue: 200000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2023-01-15',
    endDate: '2024-06-30',
    name: 'Dự án Phát Triển Công Nghệ Sản Xuất Cao Su Sạch',
    agreementValue: 180000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2022-11-10',
    endDate: '2024-03-15',
    name: 'Dự án Tăng Cường Ứng Dụng Công Nghệ IoT Trong Trồng Cao Su',
    agreementValue: 250000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2023-08-20',
    endDate: '2025-02-28',
    name: 'Dự án Xây Dựng Nhà Máy Chế Biến Cao Su Hiện Đại',
    agreementValue: 350000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2022-12-05',
    endDate: '2024-07-20',
    name: 'Dự án Nghiên Cứu Cao Su Tự Nhiên Kháng Chống Dịch',
    agreementValue: 280000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2023-03-10',
    endDate: '2024-09-15',
    name: 'Dự án Phát Triển Cao Su Có Thời Gian Sống Dài Hơn',
    agreementValue: 220000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2023-09-25',
    endDate: '2025-04-30',
    name: 'Dự án Tăng Cường Hệ Thống Logistics Cho Ngành Cao Su',
    agreementValue: 310000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2023-05-12',
    endDate: '2024-11-10',
    name: 'Dự án Mở Rộng Vùng Trồng Cao Su Bền Vững',
    agreementValue: 270000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2023-10-18',
    endDate: '2025-05-25',
    name: 'Dự án Xây Dựng Mạng Lưới Phân Phối Cao Su Toàn Quốc',
    agreementValue: 330000,
    processingStage: getRandomProcessingStage()
  },
  {
    startTime: '2023-07-08',
    endDate: '2025-01-15',
    name: 'Dự án Thúc Đẩy Xuất Khẩu Cao Su Sang Thị Trường Châu Á',
    agreementValue: 290000,
    processingStage: getRandomProcessingStage()
  }
]
