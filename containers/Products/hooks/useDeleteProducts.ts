import { useMutation, useQueryClient } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import { productQueryKey } from '@app/containers/Products/constants/product.query-key'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'

interface DeleteProductParams {
  id: string[]
}

const useDeleteProducts = () => {
  const queryClient = useQueryClient()
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteProductParams: DeleteProductParams) =>
      await callApi(`${KMAPP_ENDPOINT.product}/delete`, 'delete', undefined, deleteProductParams),
    onSuccess: () => {
      // queryClient.resetQueries({
      //   predicate: (query) => query.queryKey[0] === productQueryKey.getAllProduct()
      // })
    },
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteProducts
