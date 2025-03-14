import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Stage } from '@app/containers/Stages/types/stage.types'

export interface UpdateStagePayload extends Stage {}

const useUpdateStage = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateStagePayload: UpdateStagePayload) =>
      await callApi(`${KMAPP_ENDPOINT.stage}/update`, 'put', updateStagePayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateStage
