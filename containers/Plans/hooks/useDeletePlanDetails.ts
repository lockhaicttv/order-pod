import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteOrdersParams } from '@app/containers/Orders/types/order.types'
import { DeletePlanDetailParams } from '@app/containers/Plans/types/plan.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteOrdersParams>
}

const useDeletePlanDetails = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deletePlanDetailParams: DeletePlanDetailParams) =>
      await callApi(`${KMAPP_ENDPOINT.planning}/detail/delete`, 'delete', undefined, deletePlanDetailParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeletePlanDetails
