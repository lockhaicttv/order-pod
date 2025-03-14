import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateDepartmentPayload } from '@app/containers/Departments/types/department.types'

const useCreateDepartment = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createDepartmentPayload: CreateDepartmentPayload) =>
      await callApi(`${KMAPP_ENDPOINT.department}/add`, 'post', createDepartmentPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateDepartment
