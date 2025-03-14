import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Tool } from '@app/containers/Tools/types/tool.types'

export interface UpdateToolPayload extends Tool {}

const useUpdateTool = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateToolPayload: UpdateToolPayload) =>
      await callApi(`${KMAPP_ENDPOINT.tool}/update`, 'put', updateToolPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateTool
