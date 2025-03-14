import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteCustomersParams } from '@app/containers/Customers/types/customer.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteCustomersParams>
}

const useDeleteCustomers = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteCustomersParams: DeleteCustomersParams) =>
      await callApi(`${KMAPP_ENDPOINT.customer}/delete`, 'delete', undefined, deleteCustomersParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteCustomers
