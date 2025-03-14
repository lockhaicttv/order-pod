import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import SortableTicket from '@app/containers/TicketPlanning/components/SortableTicket'
import { Ticket } from '@app/containers/TicketPlanning/types/ticket-planning.types'
import { Typography } from '@app/components/ui/typography'
import classNames from 'classnames'

interface Props {
  items: Ticket[]
  id: string
}

export default function StatusArea(props: Props) {
  const { id, items } = props

  const { setNodeRef } = useDroppable({
    id
  })

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className={classNames([
          'space-y-4 flex-1 bg-neutral-200 p-1.5 col-span-1',
          {
            'h-[200vh]': !items.length
          }
        ])}
      >
        <div>
          <Typography variant='large' className='uppercase text-neutral-500'>
            {id}
          </Typography>
        </div>
        {items.map((ticket) => (
          <SortableTicket key={ticket.id} id={ticket.id} ticket={ticket} />
        ))}
      </div>
    </SortableContext>
  )
}
