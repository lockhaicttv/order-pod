import React, { useEffect, useState } from 'react'
import {
  EmployeeTicket as EmployeeTicketProps,
  TicketStatus
} from '@app/containers/TicketPlanning/types/ticket-planning.types'
import TicketStatusTag from '@app/containers/TicketPlanning/components/TicketStatusTag'
import { Card, CardContent } from '@app/components/ui/card'
import { Badge } from '@app/components/ui/badge'
import { Button } from '@app/components/ui/button'
import { GearIcon, PersonIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import InfoWithIcon from '@app/components/InfoWithIcon/InfoWithIcon'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import Select from '@app/components/Select'
import { BaseEmployee } from '@app/containers/Employees/types/employee.types'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { ticketPlanningQueryKey } from '@app/containers/TicketPlanning/constants/ticket-planning.query-key'
import { useRouter } from 'next/navigation'
import useGetEmployeeGroup from '@app/containers/Employees/hooks/useGetEmployeeByGroup'
import useUpdateWorkingEmployee from '@app/containers/TicketPlanning/hooks/useUpdateWorkingEmployee'
import useUpdateEmployeeTicket from '@app/containers/TicketPlanning/hooks/useUpdateEmployeeTicket'

interface Props {
  ticket: EmployeeTicketProps
  groupId: string
}

const EmployeeTicket = ({ ticket, groupId }: Props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id, status, machine, quotaWeight, date, workingEmployee, output, groupTicketId, inputs } = ticket
  const [assignee, setAssignee] = useState<BaseEmployee>(ticket.workingEmployee)
  const { mutate: mutateUpdateWorkingEmployee, isPending: isUpdatingWorkingEmployee } = useUpdateWorkingEmployee()
  const { mutate: mutateUpdateEmployeeTicket, isPending: isUpdatingEmployeeTicket } = useUpdateEmployeeTicket()
  const [isUpdateAssignee, setIsUpdateAssignee] = useState(false)
  const [isUpdateEmployeeTicketStatus, setIsUpdateEmployeeTicketStatus] = useState(false)
  const [employeeTicketStatus, setEmployeeTicketStatus] = useState<TicketStatus>(ticket.status)

  const { data: employeeLeaders, isLoading: isGettingEmployeeLeaders } = useGetEmployeeGroup(groupId)
  const employeeOptions = generateMultiSelectOptions<BaseEmployee>({
    data: employeeLeaders?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })
  const statusOption = Object.values(TicketStatus).map((status) => ({
    label: status.toUpperCase(),
    value: status
  }))

  const handleChangeEmployeeTicket = (employeeTicket: EmployeeTicketProps) => {
    mutateUpdateEmployeeTicket(employeeTicket, {
      onSuccess: async () => {
        toast.success('Update assignee leader successfully')
        setIsUpdateAssignee(false)
        setIsUpdateEmployeeTicketStatus(false)
        setAssignee(employeeTicket.workingEmployee)
        setEmployeeTicketStatus(employeeTicket.status)
        await queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === ticketPlanningQueryKey.getTicket('')[0] ||
            query.queryKey[0] === ticketPlanningQueryKey.getTicketPlanningByDate()[0]
        })
      }
    })
  }

  useEffect(() => {
    setAssignee(ticket.workingEmployee)
    setEmployeeTicketStatus(ticket.status)
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
        {/*<div className='flex justify-between '>*/}
        {/*  <Badge>{order.code}</Badge>*/}
        {/*</div>*/}

        <div className='flex justify-between'>
          <div className='flex gap-2'>
            {isUpdateAssignee ? (
              <div className='w-24'>
                <Select
                  name='employee'
                  value={assignee}
                  onValueChange={(employee) =>
                    handleChangeEmployeeTicket({
                      ...ticket,
                      workingEmployee: employee,
                      status: ticket.status === TicketStatus.OPEN ? TicketStatus.ASSIGNEE : ticket.status
                    })
                  }
                  options={employeeOptions}
                  valueKey={'id'}
                />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  setIsUpdateAssignee(true)
                  setIsUpdateEmployeeTicketStatus(false)
                }}
                className='cursor-pointer'
              >
                <InfoWithIcon
                  isShowFull={true}
                  icon={<PersonIcon />}
                  info={<Badge variant='outline'>{assignee?.name}</Badge>}
                  title={'Working employee'}
                />
              </div>
            )}
          </div>
        </div>

        <InfoWithIcon
          icon={<GearIcon />}
          info={machine?.code}
          title={'Machine'}
          isShowFull={true}
        />
        <div className='space-y-2 mb-2'>
          <div className='max-h-12 overflow whitespace-break-spaces text-ellipsis ease-linear line-clamp-2'>
            <span className='text-neutral-500'>Output product: </span>
            {output.name}
          </div>
          <div>
            <span className='text-neutral-500'>Quota weight</span>: {quotaWeight}
          </div>
          <div className='h-12 overflow whitespace-break-spaces text-ellipsis ease-linear line-clamp-2'>
            <span className='text-neutral-500'>Input material</span>:{' '}
            {inputs.map((input) => input.productInfo.name).join('')}
          </div>
        </div>

        <div className='flex justify-end'>
          {isUpdateEmployeeTicketStatus ? (
            <div className='w-32'>
              <Select
                name='status'
                value={employeeTicketStatus}
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

export default EmployeeTicket
