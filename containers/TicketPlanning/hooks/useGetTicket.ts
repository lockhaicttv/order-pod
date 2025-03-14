import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { ticketPlanningQueryKey } from '@app/containers/TicketPlanning/constants/ticket-planning.query-key'
import { Ticket } from '@app/containers/TicketPlanning/types/ticket-planning.types'

interface GetTicketParams {
  id: string
}
const useGetTicket = ({ id }: GetTicketParams) => {
  return useQuery({
    queryKey: ticketPlanningQueryKey.getTicket(id),
    queryFn: async () => {
      return await callApi<DataEntry<Ticket>, GetTicketParams>(`${KMAPP_ENDPOINT.ticket}/id`, 'get', undefined, {
        id
      })
    },
    enabled: !!id
  })
}

export default useGetTicket
