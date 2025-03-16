import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Order, UpdateOrderStatusPayload } from '@app/containers/Orders2/types/order.types'
import { toast } from 'react-toastify'

const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: async (updateOrderStatusPayload: UpdateOrderStatusPayload) =>
      await callApi<DataEntry<Order>, UpdateOrderStatusPayload>(
        `${KMAPP_ENDPOINT.order}/update/${updateOrderStatusPayload.orderId}?status=${updateOrderStatusPayload.status}`,
        'put'
      ),
    onError: (error) => {
      toast.error('Update order status fail!')
      console.log(error)
    }
  })
}

export default useUpdateOrderStatus
