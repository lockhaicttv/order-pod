import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreatePositionPayload } from '@app/containers/Positions/types/position.types'

const useCreateUser = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createPositionPayload: CreatePositionPayload) =>
      await callApi(`${KMAPP_ENDPOINT.position}/add`, 'post', createPositionPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateUser
