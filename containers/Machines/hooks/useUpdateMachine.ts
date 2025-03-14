import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Machine } from '@app/containers/Machines/types/machine.types'

export interface UpdateMachinePayload extends Machine {}

const useUpdateMachine = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateRecipePayload: UpdateMachinePayload) =>
      await callApi(`${KMAPP_ENDPOINT.machine}/update`, 'put', updateRecipePayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateMachine
