import { useMutation, useQueryClient } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import { productQueryKey } from '@app/containers/Products/constants/product.query-key'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Product } from '@app/containers/Products/types/product.types'

export interface UpdateProductPayload extends Product {}

const useDeleteProducts = () => {
  const queryClient = useQueryClient()
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateProductPayload: UpdateProductPayload) =>
      await callApi(`${KMAPP_ENDPOINT.product}/update`, 'put', updateProductPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteProducts
