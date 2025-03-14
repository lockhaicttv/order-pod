import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateCustomerPayload } from '@app/containers/Customers/types/customer.types'

const useUpdateCustomer = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateCustomerPayload: UpdateCustomerPayload) =>
      await callApi(`${KMAPP_ENDPOINT.tool}/update`, 'put', updateCustomerPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateCustomer
