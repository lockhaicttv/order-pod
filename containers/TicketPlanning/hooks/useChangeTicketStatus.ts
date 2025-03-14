import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { ChangeTicketStatusQuery } from '@app/containers/TicketPlanning/types/ticket-planning.types'

const useChangeTicketStatus = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (changeTicketStatusQuery: ChangeTicketStatusQuery) =>
      await callApi(`${KMAPP_ENDPOINT.ticket}/change-status`, 'put', undefined, changeTicketStatusQuery),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useChangeTicketStatus
