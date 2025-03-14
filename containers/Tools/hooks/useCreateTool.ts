import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Tool } from '@app/containers/Tools/types/tool.types'

export interface CreateToolPayload extends Omit<Tool, 'id'> {}

const useCreateTool = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createToolPayload: CreateToolPayload) =>
      await callApi(`${KMAPP_ENDPOINT.tool}/add`, 'post', createToolPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateTool
