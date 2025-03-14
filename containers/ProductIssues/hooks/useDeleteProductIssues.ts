import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteProductIssuesParams } from '@app/containers/ProductIssues/types/product-issue.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteProductIssuesParams>
}

const useDeleteProductIssues = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteProductIssuesParams: DeleteProductIssuesParams) =>
      await callApi(`${KMAPP_ENDPOINT.productIssue}/delete`, 'delete', undefined, deleteProductIssuesParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteProductIssues
