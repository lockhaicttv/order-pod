import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'

interface DeleteProductionQuotaParams {
  id: string[]
}

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteProductionQuotaParams>
}

const useDeleteProductionQuotas = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteProductionQuotasParams: DeleteProductionQuotaParams) =>
      await callApi(`${KMAPP_ENDPOINT.productionQuota}/delete`, 'delete', undefined, deleteProductionQuotasParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteProductionQuotas
