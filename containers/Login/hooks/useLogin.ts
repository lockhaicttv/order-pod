import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { LoginPayload } from '@app/containers/Login/types/'
import useStore from '@app/store/useStore'
import cookieStorage from '@app/utils/cookieStorage'
import { toast } from 'react-toastify'
const useLogin = () => {
  const { handleAPIError } = useHandleErrors()
  const { setIsAuthenticated } = useStore()

  return useMutation({
    mutationFn: async (loginPayload: Omit<LoginPayload, 'rememberMe'>) => {
      return await callApi<string, undefined, LoginPayload>(
        `${KMAPP_ENDPOINT.security}/authentication`,
        'post',
        loginPayload
      )
    },
    onSuccess: (data?: string) => {
      if (data) {
        cookieStorage.set((prev) => ({ ...prev, token: data }))
        setIsAuthenticated(true)
        toast.success('Login successfully!')
      }
    },
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useLogin
