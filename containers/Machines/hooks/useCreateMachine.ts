import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { Machine } from '@app/containers/Machines/types/machine.types'

export interface CreateMachinePayload extends Omit<Machine, 'id'> {}

const useCreateMachine = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createMachinePayload: CreateMachinePayload) =>
      await callApi(`${KMAPP_ENDPOINT.machine}/add`, 'post', createMachinePayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateMachine
