import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateCustomer } from '@app/containers/Customers/types/customer.types'

const useCreateCustomer = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createCustomer: CreateCustomer) =>
      await callApi(`${KMAPP_ENDPOINT.customer}/add`, 'post', createCustomer),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateCustomer
