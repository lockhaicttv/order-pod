import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateAssigneeLeaderQuery } from '@app/containers/TicketPlanning/types/ticket-planning.types'

const useUpdateAssigneeLeader = () => {
  const { handleAPIError } = useHandleErrors()

  return useMutation({
    mutationFn: async (updateAssigneeLeaderQuery: UpdateAssigneeLeaderQuery) =>
      await callApi(`${KMAPP_ENDPOINT.ticket}`, 'put', undefined, updateAssigneeLeaderQuery),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateAssigneeLeader
