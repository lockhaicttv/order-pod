import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Ticket } from '@app/containers/TicketPlanning/types/ticket-planning.types'
import { ticketPlanningQueryKey } from '@app/containers/TicketPlanning/constants/ticket-planning.query-key'

const useGetTickets = (query?: ListingQuery) => {
  return useQuery({
    queryKey: ticketPlanningQueryKey.getAllTickets(query),
    queryFn: async () => {
      return await callApi<DataEntry<Ticket[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.ticket}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetTickets
