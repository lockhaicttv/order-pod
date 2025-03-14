import React from 'react'
import { Typography } from '@app/components/ui/typography'
import { Badge } from '@app/components/ui/badge'

interface Props {
  headerName: string
  totalItems?: number
}
const TableHeader: React.FC<Props> = ({ headerName, totalItems }) => {
  return (
    <div className='flex gap-4'>
      <Typography variant='h3'>{headerName}</Typography>
      {!!totalItems && <Badge variant='outline'>{totalItems}</Badge>}
    </div>
  )
}

export default TableHeader
