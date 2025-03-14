import React from 'react'
import { PackageOpenIcon } from 'lucide-react'
import theme from '@app/utils/theme'
import { Typography } from '@app/components/ui/typography'

const EmptyData = () => {
  return (
    <div className='flex content-center items-center flex-col gap-4'>
      <div className=''>
        <PackageOpenIcon className='text-primary' size={65} />
      </div>
      <div>
        <Typography variant='h4' className='font-medium text-foreground'>
          No data
        </Typography>
      </div>
    </div>
  )
}

export default EmptyData
