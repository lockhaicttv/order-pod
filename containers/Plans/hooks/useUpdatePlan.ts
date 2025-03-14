import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateOrderPayload } from '@app/containers/Orders/types/order.types'

const useUpdatePlan = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateOrderPayload: UpdateOrderPayload) =>
      await callApi(`${KMAPP_ENDPOINT.order}/update`, 'put', updateOrderPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdatePlan
