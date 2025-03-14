import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateProcessPayload } from '@app/containers/Processes/types/process-type.types'

const useUpdateProcess = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateProcessPayload: UpdateProcessPayload) =>
      await callApi(`${KMAPP_ENDPOINT.process}/update`, 'put', updateProcessPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateProcess
