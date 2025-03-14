import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeletePositionsParams } from '@app/containers/Positions/types/position.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeletePositionsParams>
}

const useDeleteUsers = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deletePositionsParams: DeletePositionsParams) =>
      await callApi(`${KMAPP_ENDPOINT.position}/delete`, 'delete', undefined, deletePositionsParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteUsers
