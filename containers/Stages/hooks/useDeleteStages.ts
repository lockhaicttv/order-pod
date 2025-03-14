import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'

interface DeleteStagesParams {
  id: string[]
}

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteStagesParams>
}

const useDeleteStages = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteStagesParams: DeleteStagesParams) =>
      await callApi(`${KMAPP_ENDPOINT.stage}/delete`, 'delete', undefined, deleteStagesParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteStages
