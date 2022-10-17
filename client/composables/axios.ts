import { getCookie } from 'h3'
import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'
import { AxiosRequest } from '@/types'

const useAxiosConfig = () => useState('axiosConfig', () => {
  const runtimeConfig = useRuntimeConfig()

  const config: AxiosRequestConfig = {
    baseURL: runtimeConfig.apiUrl,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
    },
  }

  return config
})

export const useHttpClient = <T = any, D = any>() => {
  const config = useAxiosConfig().value

  const instance = axios.create(config)

  if (process.server) {
    const runtimeConfig = useRuntimeConfig()
    const cookieName = runtimeConfig.authCookieName
    const token = getCookie(useRequestEvent(), cookieName)

    if (token) {
      instance.defaults.headers.Authorization = `Bearer ${token}`
    }
  }

  instance.interceptors.request.use((config: AxiosRequestConfig<D>) => {
    return config
  }, (error: AxiosError<T, D>) => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use((response: AxiosResponse<T, D>) => {
    return response
  }, (error: AxiosError<T, D>) => {
    if (error.name === 'AxiosError' && error.code === 'ERR_NETWORK') {
      ElNotification.error({
        title: 'Error',
        message: error.message,
      })

      return false
    }

    switch (error.response?.status) {
      case 404:
        return {
          status: error.response.status,
          data: {
            data: null,
          },
        }
    }

    return Promise.reject(error)
  })

  const defaultMethod = 'post'

  const httpClient = {
    get: (url: string, params?: any, headers?: any): Promise<AxiosResponse<T, D>> => {
      return instance.get(url, {
        params,
        headers,
      })
    },
    post: (url: string, data?: any, headers?: any): Promise<AxiosResponse<T, D>> => {
      return instance.post(url, data, {
        headers,
      })
    },
    put: (url: string, data?: any, headers?: any): Promise<AxiosResponse<T, D>> => {
      return instance.put(url, data, {
        headers,
      })
    },
    patch: (url: string, data?: any, headers?: any): Promise<AxiosResponse<T, D>> => {
      return instance.patch(url, data, {
        headers,
      })
    },
    delete: (url: string, params?: any, headers?: any): Promise<AxiosResponse<T, D>> => {
      return instance.delete(url, {
        params,
        headers,
      })
    },
    multiple: async (requests: AxiosRequest[]): Promise<AxiosResponse<T, D>[]> => {
      const axiosRequest = []

      for (const request of requests) {
        let method = (request.method || defaultMethod).toLowerCase()
        method = Object.prototype.hasOwnProperty.call(httpClient, method) && method !== 'multiple'
          ? method
          : defaultMethod

        axiosRequest.push(httpClient[method](request))
      }

      return axiosRequest.length ? await Promise.all(axiosRequest) : []
    },
  }

  return httpClient
}
