import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'

interface DeleteMachinesParams {
  id: string[]
}

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteMachinesParams>
}

const useDeleteMachines = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteMachinesParams: DeleteMachinesParams) =>
      await callApi(`${KMAPP_ENDPOINT.machine}/delete`, 'delete', undefined, deleteMachinesParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteMachines
