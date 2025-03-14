import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateEmployeeTicketPayload } from '@app/containers/TicketPlanning/types/ticket-planning.types'

const useUpdateEmployeeTicket = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateEmployeeTicketPayload: UpdateEmployeeTicketPayload) =>
      await callApi(`${KMAPP_ENDPOINT.employeeTicket}/update`, 'put', updateEmployeeTicketPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateEmployeeTicket
