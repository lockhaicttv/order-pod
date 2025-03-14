import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteDepartmentsParams } from '@app/containers/Departments/types/department.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteDepartmentsParams>
}

const useDeleteDepartments = ({ options }: Props = {}) => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteDepartmentsParams: DeleteDepartmentsParams) =>
      await callApi(`${KMAPP_ENDPOINT.department}/delete`, 'delete', undefined, deleteDepartmentsParams),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteDepartments
