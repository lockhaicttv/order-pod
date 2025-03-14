import axios from 'axios'
import { toast } from 'react-toastify'
import env from '@app/constants/env'
import cookieStorage from '@app/utils/cookieStorage'

const instance = axios.create({
  baseURL: env.API_BASE_URL
})

instance.interceptors.request.use((config) => {
  const token = cookieStorage.getByKey('token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

instance.interceptors.response.use(
  (res) => {
    return new Promise((resolve) => {
      if (res.data.errorCode) {
        handleErrorCode(res.data.errorCode)
      }
      resolve(res.data)
    })
  },
  (err) => {
    if (!err.response) {
      return new Promise((_, reject) => {
        reject(err)
      })
    }

    if (err.response.status === 401 || err.response.status === 403) {
      cookieStorage.remove()
      cookieStorage.destroy()

      toast.error('Token is expired, please login again!')
      if (!window.location.pathname.includes('login')) {
        window.location.href = `/login?redirect=${window.location.pathname}`
      }
    } else {
      return new Promise((_, reject) => {
        reject(err)
      })
    }
  }
)

export default instance

const handleErrorCode = (errorCode: number) => {}
