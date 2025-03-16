import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateOrderPayload } from '@app/containers/Orders2/types/order.types'

const useExportOrders = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createOrderPayload: CreateOrderPayload) =>
      await callApi(`${KMAPP_ENDPOINT.file}/download`, 'get', createOrderPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useExportOrders
