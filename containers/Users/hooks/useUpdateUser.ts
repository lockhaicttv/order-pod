import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdatePositionPayload } from '@app/containers/Positions/types/position.types'

const useUpdateUser = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updatePositionPayload: UpdatePositionPayload) =>
      await callApi(`${KMAPP_ENDPOINT.position}/admin-update`, 'put', updatePositionPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateUser
