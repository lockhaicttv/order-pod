import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateDepartmentPayload } from '@app/containers/Departments/types/department.types'

const useUpdateDepartment = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateDepartmentPayload: UpdateDepartmentPayload) =>
      await callApi(`${KMAPP_ENDPOINT.department}/update`, 'put', updateDepartmentPayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateDepartment
