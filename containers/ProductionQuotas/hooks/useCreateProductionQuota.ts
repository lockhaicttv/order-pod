import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateProductionQuotaPayload } from '@app/containers/ProductionQuotas/types/production-quota-type.types'

const useCreateProductionQuota = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createProductionQuotaPayload: CreateProductionQuotaPayload) =>
      await callApi(`${KMAPP_ENDPOINT.productionQuota}/add`, 'post', createProductionQuotaPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateProductionQuota
