import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateProductionQuotaPayload } from '@app/containers/ProductionQuotas/types/production-quota-type.types'

const useUpdateProductionQuota = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateProductionQuotaPayload: UpdateProductionQuotaPayload) =>
      await callApi(`${KMAPP_ENDPOINT.productionQuota}/update`, 'put', updateProductionQuotaPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateProductionQuota
