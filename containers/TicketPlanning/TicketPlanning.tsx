import React, { useEffect, useState } from 'react'
import Page from '@app/components/Page/Page'
import DatePicker from '@app/components/DatePicker'
import useGetTicketPlanningByDate from '@app/containers/TicketPlanning/hooks/useGetTicketPlanningByDate'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { Typography } from '@app/components/ui/typography'
import {
  TicketStatus,
  Ticket as TicketProps,
  FilterProps
} from '@app/containers/TicketPlanning/types/ticket-planning.types'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import StatusArea from '@app/containers/TicketPlanning/components/StatusArea'
import SortableTicket from '@app/containers/TicketPlanning/components/SortableTicket'
import useChangeTicketStatus from '@app/containers/TicketPlanning/hooks/useChangeTicketStatus'
import { toast } from 'react-toastify'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import Combobox from '@app/components/Combobox'
import useGetOrders from '@app/containers/Orders/hooks/useGetOrders'
import useSearchParams from '@app/hooks/useSearchParams'
import qs from 'qs'

const currentDate = new Date()

const droppableAreas = [TicketStatus.OPEN, TicketStatus.ASSIGNEE, TicketStatus.DOING, TicketStatus.DONE]

const TicketPlanning = () => {
  const { searchParams, setSearchParamsToUrl } = useSearchParams()
  const filter = qs.parse(searchParams.get('filter') || '') as FilterProps
  const [tickets, setTickets] = useState({
    [`${TicketStatus.OPEN}`]: [] as TicketProps[],
    [`${TicketStatus.ASSIGNEE}`]: [] as TicketProps[],
    [`${TicketStatus.DOING}`]: [] as TicketProps[],
    [`${TicketStatus.DONE}`]: [] as TicketProps[]
  })
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  const [activeTicket, setActiveTicket] = useState<
    | {
        id: string
        ticket: TicketProps
      }
    | undefined
  >()

  const { data: ticketPlanning, isLoading } = useGetTicketPlanningByDate({
    ...filter,
    date: filter?.date ? new Date(filter.date).toISOString() : currentDate.toISOString()
  })

  const { mutate: mutateChangeTicketStatus, isPending: isChangingTicketStatus, isSuccess } = useChangeTicketStatus()

  function findContainer(id: string) {
    if (id in tickets) {
      return id
    }

    return Object.keys(tickets).find((key) => tickets[key as TicketStatus].find((ticket) => ticket.id === id))
  }

  function handleDragOver(event: any) {
    const { active, over, draggingRect } = event
    const { id } = active
    const { id: overId } = over

    // Find the containers
    const activeContainer = findContainer(id) as TicketStatus
    const overContainer = findContainer(overId) as TicketStatus
    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return
    }

    setTickets((prev) => {
      const activeTickets = prev[activeContainer]
      const overTickets = prev[overContainer]

      // Find the indexes for the items
      const activeIndex = activeTickets.findIndex((ticket) => ticket.id === id)
      const overIndex = overTickets.findIndex((ticket) => ticket.id === overId)

      let newIndex
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overTickets.length + 1
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overTickets.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height

        const modifier = isBelowLastItem ? 1 : 0

        newIndex = overIndex >= 0 ? overIndex + modifier : overTickets.length + 1
      }

      const newOverTickets = [...prev[overContainer]]
      const newActiveTickets = [...prev[activeContainer].filter((ticket: TicketProps) => ticket.id !== active.id)]

      newOverTickets.splice(newIndex, 0, prev[activeContainer][activeIndex])

      return {
        ...prev,
        [activeContainer]: [...newActiveTickets],
        [overContainer]: [...newOverTickets]
      }
    })
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    const { id, data } = active

    setActiveTicket({ id: id as string, ticket: data.current as unknown as TicketProps })
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    const activeContainer = findContainer(active?.id as string) as TicketStatus
    const overContainer = findContainer(over?.id as string) as TicketStatus

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer ||
      activeTicket?.ticket.status === activeContainer
    ) {
      return
    }

    mutateChangeTicketStatus(
      {
        id: active.id as string,
        status: activeContainer
      },
      {
        onSuccess: () => {
          toast.success('Update status successfully!')

          const activeIndex = tickets[activeContainer].findIndex((ticket: TicketProps) => ticket.id === active.id)
          const overIndex = tickets[overContainer].findIndex((ticket: TicketProps) => ticket.id === over?.id)

          const newOverContainers = [...tickets[overContainer]].map((ticket) => {
            if (ticket.id !== active.id) return ticket

            return {
              ...ticket,
              status: overContainer
            }
          })

          if (activeIndex !== overIndex) {
            setTickets((prevTickets) => ({
              ...prevTickets,
              [overContainer]: arrayMove([...newOverContainers], activeIndex, overIndex)
            }))
          } else {
            setTickets((prevTickets) => ({
              ...prevTickets,
              [overContainer]: newOverContainers
            }))
          }
        },
        onError: () => {
          toast.error('Update status fail!')
        },
        onSettled: () => {
          setActiveTicket(undefined)
        }
      }
    )
  }

  const handleChangeFilter = (newFilter: FilterProps) => {
    searchParams.set('filter', qs.stringify(newFilter))
    setSearchParamsToUrl()
  }

  const { data: orders } = useGetOrders()
  const { data: stages } = useGetStages()
  const stageOptions = generateMultiSelectOptions({
    data: stages?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: false
  })
  const orderOptions = generateMultiSelectOptions({
    data: orders?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: false
  })

  useEffect(() => {
    if (ticketPlanning?.data) {
      let openTickets: TicketProps[] = []
      let doingTickets: TicketProps[] = []
      let doneTickets: TicketProps[] = []
      let assigneeTickets: TicketProps[] = []

      ticketPlanning?.data.forEach((ticket) => {
        if (ticket.status === TicketStatus.OPEN) openTickets.push(ticket)
        if (ticket.status === TicketStatus.ASSIGNEE) assigneeTickets.push(ticket)
        if (ticket.status === TicketStatus.DOING) doingTickets.push(ticket)
        if (ticket.status === TicketStatus.DONE) doneTickets.push(ticket)
      })

      setTickets({
        [`${TicketStatus.OPEN}`]: [...openTickets],
        [`${TicketStatus.ASSIGNEE}`]: [...assigneeTickets],
        [`${TicketStatus.DOING}`]: [...doingTickets],
        [`${TicketStatus.DONE}`]: [...doneTickets]
      })
    }
  }, [ticketPlanning])

  const ticketsByArea = (area: TicketStatus) => {
    if (area === TicketStatus.OPEN) return [...tickets?.[`${TicketStatus.OPEN}`]]
    if (area === TicketStatus.ASSIGNEE) return [...tickets?.[`${TicketStatus.ASSIGNEE}`]]
    if (area === TicketStatus.DOING) return [...tickets?.[`${TicketStatus.DOING}`]]
    if (area === TicketStatus.DONE) return [...tickets?.[`${TicketStatus.DONE}`]]
  }

  return (
    <Page>
      <BackDrop isLoading={isLoading} />
      <div className='mb-2'>
        <Typography variant='h2'>Ticket Planning</Typography>
      </div>
      <div className='flex flex-col tablet:flex-row desktop:w-1/2 gap-2'>
        <div className='w-full tablet:w-52'>
          <DatePicker
            value={filter.date ? new Date(filter?.date) : currentDate}
            onChange={(value) =>
              handleChangeFilter({
                ...filter,
                date: value?.toISOString()
              })
            }
            label={'Date'}
          />
        </div>
        <div className='flex gap-2 w-full desktop:w-auto'>
          <div className='w-full tablet:w-44'>
            <Combobox
              onValueChange={(value) =>
                handleChangeFilter({
                  ...filter,
                  stageId: value
                })
              }
              value={filter.stageId}
              options={stageOptions}
              name={'stage'}
              placeholder={'Select stage'}
              label={'Stage'}
            />
          </div>
          <div className='w-full tablet:w-44'>
            <Combobox
              onValueChange={(value) =>
                handleChangeFilter({
                  ...filter,
                  orderId: value
                })
              }
              value={filter.orderId}
              options={orderOptions}
              name={'order'}
              placeholder={'Select order'}
              label={'Order'}
            />
          </div>
        </div>
      </div>

      <div className='grid desktop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 gap-4 mt-4'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <>
            {droppableAreas.map((area) => {
              return <StatusArea items={ticketsByArea(area) || []} id={area} key={area} />
            })}
            <DragOverlay>
              {activeTicket ? <SortableTicket id={activeTicket.id} ticket={activeTicket.ticket} /> : null}
            </DragOverlay>
          </>
        </DndContext>
      </div>
    </Page>
  )
}

export default TicketPlanning
