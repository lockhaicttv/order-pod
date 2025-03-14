import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreatePlanDetailParams, CreatePlanDetailPayload } from '@app/containers/Plans/types/plan.types'

const useCreatePlanDetail = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async ({
      createPlanDetailPayload,
      createPlanDetailParams
    }: {
      createPlanDetailPayload: CreatePlanDetailPayload
      createPlanDetailParams: CreatePlanDetailParams
    }) => await callApi(`${KMAPP_ENDPOINT.planDetail}/add`, 'post', createPlanDetailPayload, createPlanDetailParams),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreatePlanDetail
