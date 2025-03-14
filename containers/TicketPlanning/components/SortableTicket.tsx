import React, { PropsWithChildren } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Ticket as TicketProps } from '@app/containers/TicketPlanning/types/ticket-planning.types'
import Ticket from '@app/containers/TicketPlanning/components/Ticket'

export default function SortableTicket(props: PropsWithChildren & { id: string; ticket: TicketProps }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id, data: props.ticket })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Ticket ticket={props.ticket} />
    </div>
  )
}
