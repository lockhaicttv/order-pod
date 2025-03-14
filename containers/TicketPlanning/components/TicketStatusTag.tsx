import React from 'react'
import { TicketStatus } from '@app/containers/TicketPlanning/types/ticket-planning.types'
import { Badge } from '@app/components/ui/badge'
import classNames from 'classnames'

interface Props {
  status: TicketStatus
}
const TicketStatusTag = ({ status }: Props) => {
  return (
    <Badge
      className={classNames([
        'px-2.5 py-1.5 uppercase',
        'pointer-events-none',
        { 'bg-yellow-500': status === TicketStatus.DONE },
        { 'bg-blue-500': status === TicketStatus.DOING },
        { 'bg-green-500': status === TicketStatus.OPEN }
      ])}
    >
      {status}
    </Badge>
  )
}

export default TicketStatusTag
