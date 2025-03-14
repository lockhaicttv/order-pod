import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateProductIssuePayload } from '@app/containers/ProductIssues/types/product-issue.types'

const useCreateProductIssue = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createProductIssuePayload: CreateProductIssuePayload) =>
      await callApi(`${KMAPP_ENDPOINT.productIssue}/add`, 'post', createProductIssuePayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateProductIssue
