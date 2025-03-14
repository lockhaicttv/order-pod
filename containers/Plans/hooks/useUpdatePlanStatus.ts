import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdatePlanStatusQuery } from '@app/containers/Plans/types/plan.types'

const useUpdatePlanStatus = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updatePlanStatusQuery: UpdatePlanStatusQuery) =>
      await callApi(`${KMAPP_ENDPOINT.planning}/change-status`, 'put', undefined, updatePlanStatusQuery),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdatePlanStatus
