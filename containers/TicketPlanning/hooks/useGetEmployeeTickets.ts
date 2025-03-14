import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Ticket } from '@app/containers/TicketPlanning/types/ticket-planning.types'
import { ticketPlanningQueryKey } from '@app/containers/TicketPlanning/constants/ticket-planning.query-key'

const useGetEmployeeTickets = (query?: ListingQuery) => {
  return useQuery({
    queryKey: ticketPlanningQueryKey.getAllEmployeeTickets(query),
    queryFn: async () => {
      return await callApi<DataEntry<Ticket[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.employeeTicket}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetEmployeeTickets
