import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateProductIssuePayload } from '@app/containers/ProductIssues/types/product-issue.types'

const useUpdateProductIssue = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateProductIssuePayload: UpdateProductIssuePayload) =>
      await callApi(`${KMAPP_ENDPOINT.productIssue}/update`, 'put', updateProductIssuePayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateProductIssue
