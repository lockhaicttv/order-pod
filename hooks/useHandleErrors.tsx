import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface ReturnProps {
  handleAPIError: (error: AxiosError) => void
}

const useHandleErrors = (): ReturnProps => {
  const handleAPIError = (error: any): void => {
    toast.error(error.response.data.message)
  }

  return {
    handleAPIError
  }
}

export default useHandleErrors
