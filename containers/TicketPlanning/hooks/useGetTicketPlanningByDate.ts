import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry } from '@app/api/types/api-common.types'
import {
  FilterProps,
  GetTicketPlanningByDateQuery,
  Ticket
} from '@app/containers/TicketPlanning/types/ticket-planning.types'
import { ticketPlanningQueryKey } from '@app/containers/TicketPlanning/constants/ticket-planning.query-key'

const useGetTicketPlanningByDate = (getTicketPlanningByDateQuery: GetTicketPlanningByDateQuery) => {
  return useQuery({
    queryKey: ticketPlanningQueryKey.getTicketPlanningByDate(getTicketPlanningByDateQuery),
    queryFn: async () => {
      return await callApi<DataEntry<Ticket[], true>, GetTicketPlanningByDateQuery>(
        `${KMAPP_ENDPOINT.ticket}/stage-order`,
        'get',
        undefined,
        { ...getTicketPlanningByDateQuery }
      )
    },
    staleTime: 0,
    gcTime: 0
  })
}

export default useGetTicketPlanningByDate
