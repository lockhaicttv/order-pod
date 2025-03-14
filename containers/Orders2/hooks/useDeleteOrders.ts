import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteOrdersParams } from '@app/containers/Orders2/types/order.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteOrdersParams>
}

const useDeleteOrders = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteOrdersParams: DeleteOrdersParams) =>
      await callApi(`${KMAPP_ENDPOINT.order}/delete`, 'delete', undefined, deleteOrdersParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteOrders
