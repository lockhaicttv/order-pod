import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CheckDeliveryDatePayload } from '@app/containers/Orders2/types/order.types'

const useCheckDeliveryDate = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (checkDeliveryDatePayload: CheckDeliveryDatePayload) =>
      await callApi<DataEntry<string>, undefined, CheckDeliveryDatePayload>(
        `${KMAPP_ENDPOINT.planning}/check-delivery-date`,
        'put',
        checkDeliveryDatePayload
      ),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCheckDeliveryDate
