import api from './axios'
import { Method, AxiosRequestConfig } from 'axios'
import env from '@app/constants/env'
import qs from 'qs'

const callApi = async <Response, RequestParams = undefined, RequestPayload = undefined>(
  endpoint: string,
  method: Method,
  data?: RequestPayload,
  params?: RequestParams,
  config?: AxiosRequestConfig
): Promise<Response | undefined> => {
  try {
    const res: Response = await api({
      ...config,
      method: method,
      url: `${env.API_BASE_URL}/${endpoint}`,
      data: data,
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })

    return res
  } catch (err) {
    console.log(err)

    throw err
  }
}

export default callApi
