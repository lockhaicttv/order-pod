import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Stage } from '@app/containers/Stages/types/stage.types'

export interface CreateStagePayload extends Omit<Stage, 'id'> {}

const useCreateStage = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createStagePayload: CreateStagePayload) =>
      await callApi(`${KMAPP_ENDPOINT.stage}/add`, 'post', createStagePayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateStage
