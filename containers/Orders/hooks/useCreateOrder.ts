import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateOrderPayload } from '@app/containers/Orders/types/order.types'

const useCreateOrder = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createOrderPayload: CreateOrderPayload) =>
      await callApi(`${KMAPP_ENDPOINT.order}/add`, 'post', createOrderPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateOrder
