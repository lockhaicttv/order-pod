import { ListingQuery } from '@app/api'
import { GetTicketPlanningByDateQuery } from '@app/containers/TicketPlanning/types/ticket-planning.types'

export const ticketPlanningQueryKey = {
  getAllTickets: (query?: ListingQuery) => ['get-all-tickets', query],
  getAllEmployeeTickets: (query?: ListingQuery) => ['get-all-employee-tickets', query],
  getTicket: (id: string) => ['get-ticket', id],
  getTicketPlanningByDate: (queries?: GetTicketPlanningByDateQuery) => ['get-ticket-planning-by-date', queries]
}
