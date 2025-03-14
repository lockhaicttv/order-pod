import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateWorkingEmployeeQuery } from '@app/containers/TicketPlanning/types/ticket-planning.types'

const useUpdateWorkingEmployee = () => {
  const { handleAPIError } = useHandleErrors()

  return useMutation({
    mutationFn: async (updateWorkingEmployeeQuery: UpdateWorkingEmployeeQuery) =>
      await callApi(`${KMAPP_ENDPOINT.employeeTicket}`, 'put', undefined, updateWorkingEmployeeQuery),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateWorkingEmployee
