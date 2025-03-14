import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateTicketPayload } from '@app/containers/TicketPlanning/types/ticket-planning.types'

const useUpdateTicket = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateTicketPayload: UpdateTicketPayload) =>
      await callApi(`${KMAPP_ENDPOINT.ticket}/update`, 'put', updateTicketPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateTicket
