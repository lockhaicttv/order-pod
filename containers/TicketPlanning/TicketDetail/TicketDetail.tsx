import { Typography } from '@app/components/ui/typography'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import BackDrop from '@app/components/BackDrop/BackDrop'

import PageContent from '@app/components/Page/PageContent'
import useGetTicket from '@app/containers/TicketPlanning/hooks/useGetTicket'
import InfoWithIcon from '@app/components/InfoWithIcon'
import { CalendarCheck2Icon, Edit2Icon, UserIcon } from 'lucide-react'
import { GearIcon, PersonIcon } from '@radix-ui/react-icons'
import { Badge } from '@app/components/ui/badge'
import { Button } from '@app/components/ui/button'
import TicketStatusTag from '@app/containers/TicketPlanning/components/TicketStatusTag'
import React, { useEffect, useState } from 'react'
import { Employee } from '@app/containers/Employees/types/employee.types'
import { toast } from 'react-toastify'
import { ticketPlanningQueryKey } from '@app/containers/TicketPlanning/constants/ticket-planning.query-key'
import useGetEmployeeLeadersByStage from '@app/containers/Employees/hooks/useGetEmployeeLeadersByStage'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useUpdateAssigneeLeader from '@app/containers/TicketPlanning/hooks/useUpdateAssigneeLeader'
import Select from '@app/components/Select'
import EmployeeTicket from '@app/containers/TicketPlanning/components/EmployeeTicket'
import { Label } from '@radix-ui/react-label'

const deptSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  shiftPerDay: z.number()
})

const employeeGroupSchema = z.object({
  code: z.string(),
  name: z.string(),
  dept: deptSchema.required().nullish()
})

const defaultValues: z.infer<typeof employeeGroupSchema> = {
  code: '',
  name: '',
  dept: null
}

const TicketDetailDetail = () => {
  const { id } = useParams()
  const isEdit = !!id
  const router = useRouter()
  const queryClient = useQueryClient()
  const [assigneeLeader, setAssigneeLeader] = useState<Employee>()
  const { mutate: mutateUpdateAssigneeLeader, isPending: isUpdatingAssigneeLeader } = useUpdateAssigneeLeader()
  const [isUpdateAssignee, setIsUpdateAssignee] = useState(false)
  const { data: ticket, isLoading: isGettingTicket } = useGetTicket({ id: id as string })
  const { data: employeeLeaders, isLoading: isGettingEmployeeLeaders } = useGetEmployeeLeadersByStage(
    ticket?.data.stage.id || ''
  )
  const employeeOptions = generateMultiSelectOptions({
    data: employeeLeaders?.data,
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })
  const handleChangeAssignee = (employee: Employee) => {
    mutateUpdateAssigneeLeader(
      {
        ticketId: id as string,
        employeeId: employee.id
      },
      {
        onSuccess: async () => {
          toast.success('Update assignee leader successfully')
          setIsUpdateAssignee(false)
          setAssigneeLeader(employee)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === ticketPlanningQueryKey.getTicket(id as string)[0]
          })
        }
      }
    )
  }

  useEffect(() => {
    setAssigneeLeader(ticket?.data.assigneeLeader)
  }, [ticket, employeeLeaders])

  if (ticket?.data) {
    const {
      inputs,
      stage,
      tools,
      order,
      shiftNumber,
      outputProduct,
      targetProduct,
      date,
      quotaWeight,
      employee,
      employeeTickets,
      machines,
      planId,
      status,
      displaySequence
    } = ticket?.data

    return (
      <>
        <BackDrop isLoading={isGettingTicket} />
        <div className='h-full flex flex-col justify-between'>
          <PageContent>
            <div className='mb-4'>
              <Typography variant='h3'>{isEdit ? `Edit ticket ${id}` : 'Create ticket'}</Typography>
            </div>
            <div className='mb-4'>
              <Label className='text-foreground'>Ticket information</Label>
            </div>
            <div className='flex border border-neutral-400 rounded-sm p-2 desktop:w-1/2'>
              <div className='desktop:w-1/2'>
                <div className='flex gap-2'>
                  {isUpdateAssignee ? (
                    <div className='w-24'>
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
                </div>
                <div className='flex justify-start gap-4'>
                  <InfoWithIcon icon={<UserIcon size={16} />} info={employee} title={'Employee'} isShowFull={true} />
                </div>
                <div>
                  <InfoWithIcon
                    icon={<CalendarCheck2Icon size={16} />}
                    info={shiftNumber}
                    title={'Shift'}
                    isShowFull={true}
                  />
                </div>

                <InfoWithIcon
                  isShowFull={true}
                  icon={<GearIcon />}
                  info={machines.map((machine) => machine.code).join(', ')}
                  title={'Machine'}
                />
              </div>
              <div className='flex flex-col gap-2 mt-4 w-1/2'>
                <div className='space-y-4 mb-2'>
                  <div className='max-h-12 overflow whitespace-break-spaces text-ellipsis ease-linear line-clamp-2'>
                    <span className='text-neutral-500'>Target product: </span>
                    <span className='text-foreground'>{targetProduct.name}</span>
                  </div>
                  <div className='max-h-12 overflow whitespace-break-spaces text-ellipsis ease-linear line-clamp-2'>
                    <span className='text-neutral-500'>Output product: </span>
                    <span className='text-foreground'>{outputProduct.name}</span>
                  </div>
                  <div>
                    <span className='text-neutral-500'>Quota weight:</span>{' '}
                    <span className='text-foreground'>{quotaWeight}</span>
                  </div>
                  <div className='h-12 overflow whitespace-break-spaces text-ellipsis ease-linear line-clamp-2'>
                    <span className='text-neutral-500'>Input material:</span>{' '}
                    <span className='text-foreground'>{inputs.map((input) => input.productInfo.name).join('')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4 desktop:w-1/2 mt-8'>
              <Label>
                <Typography>Sub-tasks</Typography>
              </Label>
              <div className='space-y-4'>
                {employeeTickets.map((employeeTicket) => (
                  <EmployeeTicket
                    key={employeeTicket.id}
                    ticket={employeeTicket}
                    groupId={assigneeLeader?.group.id || ''}
                  />
                ))}
              </div>
            </div>
          </PageContent>
        </div>
      </>
    )
  }

  return null
}

export default TicketDetailDetail
