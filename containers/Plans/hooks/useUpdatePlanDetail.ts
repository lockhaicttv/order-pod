import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdatePlanDetailParams, UpdatePlanDetailPayload } from '@app/containers/Plans/types/plan.types'

const useUpdatePlanDetail = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async ({
      updatePlanDetailPayload,
      updatePlanDetailParams
    }: {
      updatePlanDetailPayload: UpdatePlanDetailPayload
      updatePlanDetailParams: UpdatePlanDetailParams
    }) => await callApi(`${KMAPP_ENDPOINT.planDetail}/update`, 'put', updatePlanDetailPayload, updatePlanDetailParams),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdatePlanDetail
