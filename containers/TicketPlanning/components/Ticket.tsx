import React, { useEffect, useState } from 'react'
import { Ticket as TicketProps, TicketStatus } from '@app/containers/TicketPlanning/types/ticket-planning.types'
import TicketStatusTag from '@app/containers/TicketPlanning/components/TicketStatusTag'
import { Card, CardContent } from '@app/components/ui/card'
import { Badge } from '@app/components/ui/badge'
import { Button } from '@app/components/ui/button'
import { GearIcon, PersonIcon } from '@radix-ui/react-icons'
import { CalendarCheck2Icon, Edit2Icon, EditIcon, ReceiptTextIcon, UserIcon } from 'lucide-react'
import classNames from 'classnames'
import InfoWithIcon from '@app/components/InfoWithIcon/InfoWithIcon'
import useGetEmployeeLeadersByStage from '@app/containers/Employees/hooks/useGetEmployeeLeadersByStage'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import Select from '@app/components/Select'
import { Employee } from '@app/containers/Employees/types/employee.types'
import useUpdateAssigneeLeader from '@app/containers/TicketPlanning/hooks/useUpdateAssigneeLeader'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { ticketPlanningQueryKey } from '@app/containers/TicketPlanning/constants/ticket-planning.query-key'
import { TICKET_PLANNING_DETAIL_EDIT_ROUTE } from '@app/containers/TicketPlanning/constants/ticket-planning-routes.constants'
import { useRouter } from 'next/navigation'
import useUpdateTicket from '@app/containers/TicketPlanning/hooks/useUpdateStage'
import theme from '@app/utils/theme'

interface Props {
  ticket: TicketProps
}

const Ticket = ({ ticket }: Props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const {
    id,
    status,
    machines,
    quotaWeight,
    employee,
    outputProduct,
    targetProduct,
    date,
    stage,
    tools,
    order,
    inputs,
    shiftNumber
  } = ticket
  const [assigneeLeader, setAssigneeLeader] = useState<Employee>(ticket.assigneeLeader)
  const { mutate: mutateUpdateAssigneeLeader, isPending: isUpdatingAssigneeLeader } = useUpdateAssigneeLeader()
  const [isUpdateAssignee, setIsUpdateAssignee] = useState(false)
  const [isUpdateEmployeeTicketStatus, setIsUpdateEmployeeTicketStatus] = useState(false)
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>(ticket.status)
  const { mutate: mutateUpdateTicket, isPending: isUpdatingTicket } = useUpdateTicket()

  const { data: employeeLeaders, isLoading: isGettingEmployeeLeaders } = useGetEmployeeLeadersByStage(stage.id)
  const employeeOptions = generateMultiSelectOptions({
    data: employeeLeaders?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })
  const statusOption = Object.values(TicketStatus).map((status) => ({
    label: status.toUpperCase(),
    value: status
  }))

  const handleChangeAssignee = (employee: Employee) => {
    mutateUpdateAssigneeLeader(
      {
        ticketId: ticket.id,
        employeeId: employee.id
      },
      {
        onSuccess: async () => {
          toast.success('Update assignee leader successfully')
          setIsUpdateAssignee(false)
          setAssigneeLeader(employee)
          await queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey[0] === ticketPlanningQueryKey.getTicketPlanningByDate()[0] ||
              query.queryKey[0] === ticketPlanningQueryKey.getTicket('')[0]
          })
        }
      }
    )
  }

  const handleChangeEmployeeTicket = (ticket: TicketProps) => {
    mutateUpdateTicket(ticket, {
      onSuccess: async () => {
        toast.success('Update assignee leader successfully')
        setIsUpdateAssignee(false)
        setIsUpdateEmployeeTicketStatus(false)
        setAssigneeLeader(ticket.assigneeLeader)
        setTicketStatus(ticket.status)
        await queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === ticketPlanningQueryKey.getTicket('')[0] ||
            query.queryKey[0] === ticketPlanningQueryKey.getTicketPlanningByDate()[0]
        })
      }
    })
  }

  useEffect(() => {
    setAssigneeLeader(ticket.assigneeLeader)
  }, [ticket, employeeLeaders])

  return (
    <Card
      className={classNames([
        'border-l-4',
        { 'border-l-yellow-500': status === TicketStatus.DONE },
        { 'border-l-blue-500': status === TicketStatus.DOING },
        { 'border-l-green-500': status === TicketStatus.OPEN }
      ])}
    >
      <CardContent className='text-start px-4 py-2'>
        <div className='flex justify-between'>
          <div className='flex justify-start gap-4'>
            <InfoWithIcon
              icon={<ReceiptTextIcon size={16} color={theme.colors.primary.DEFAULT} />}
              info={order.code}
              title={'Order'}
            />
            <InfoWithIcon icon={<UserIcon size={16} />} info={employee} title={'Employee'} />
            <InfoWithIcon icon={<CalendarCheck2Icon size={16} />} info={shiftNumber} title={'Shift'} />
          </div>
          <div className='flex gap-2'>
            {isUpdateAssignee ? (
              <div className='w-20'>
                <Select
                  name='assigneeLeader'
                  value={assigneeLeader}
                  onValueChange={handleChangeAssignee}
                  options={employeeOptions}
                  valueKey={'id'}
                />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  setIsUpdateAssignee(true)
                }}
                className='cursor-pointer'
              >
                <InfoWithIcon
                  icon={<PersonIcon />}
                  info={<Badge variant='outline'>{assigneeLeader?.name}</Badge>}
                  title={'Assignee Leader'}
                />
              </div>
            )}
            <div className='flex items-center'>
              <Button
                variant='ghost'
                className='p-2 h-auto min-h-0 rounded-full'
                onClick={() => router.push(TICKET_PLANNING_DETAIL_EDIT_ROUTE(id))}
              >
                <Edit2Icon size={15} />
              </Button>
            </div>
          </div>
        </div>

        <InfoWithIcon icon={<GearIcon />} info={machines.map((machine) => machine.code).join(', ')} title={'Machine'} />
        <div className='space-y-2 mb-2'>
          <div className='max-h-12 overflow whitespace-break-spaces text-ellipsis ease-linear line-clamp-2'>
            <span className='text-neutral-500'>Target product: </span>
            {targetProduct.name}
          </div>
          <div className='max-h-12 overflow whitespace-break-spaces text-ellipsis ease-linear line-clamp-2'>
            <span className='text-neutral-500'>Output product: </span>
            {outputProduct.name}
          </div>
          <div>
            <span className='text-neutral-500'>Quota weight</span>: {quotaWeight}
          </div>
          <div className='h-12 overflow whitespace-break-spaces text-ellipsis ease-linear line-clamp-2'>
            <span className='text-neutral-500'>Input</span>: {inputs.map((input) => input.productInfo.name).join('')}
          </div>
        </div>

        <div className='flex justify-end'>
          {isUpdateEmployeeTicketStatus ? (
            <div className='w-32'>
              <Select
                name='status'
                value={ticketStatus}
                onValueChange={(status) =>
                  handleChangeEmployeeTicket({
                    ...ticket,
                    status
                  })
                }
                options={statusOption}
              />
            </div>
          ) : (
            <Button
              onClick={() => {
                setIsUpdateEmployeeTicketStatus(true)
                setIsUpdateAssignee(false)
              }}
              variant='ghost'
              className='p-0 h-auto'
            >
              <TicketStatusTag status={status} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Ticket
