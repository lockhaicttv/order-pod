import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateProcessPayload } from '@app/containers/Processes/types/process-type.types'

const useCreateProcess = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createProcessPayload: CreateProcessPayload) =>
      await callApi(`${KMAPP_ENDPOINT.process}/add`, 'post', createProcessPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateProcess
