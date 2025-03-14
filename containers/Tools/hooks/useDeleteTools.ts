import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'

interface DeleteToolsParams {
  id: string[]
}

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteToolsParams>
}

const useDeleteTools = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteToolsParams: DeleteToolsParams) =>
      await callApi(`${KMAPP_ENDPOINT.tool}/delete`, 'delete', undefined, deleteToolsParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteTools
