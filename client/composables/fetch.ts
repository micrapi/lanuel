import { getCookie } from 'h3'
import type { FetchOptions, SearchParams } from 'ohmyfetch'
import { FetchRequest } from '@/types'
import type { FetchBody } from '@/types'

export const useHttpFetch = () => {
  const runtimeConfig = useRuntimeConfig()
  const config: FetchOptions = {
    baseURL: runtimeConfig.apiUrl,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    retry: 1,
  }

  if (process.server) {
    const token = getCookie(useRequestEvent(), runtimeConfig.authCookieName)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }

  const instance = $fetch.create(config)

  const httpClient = {
    get: <T = unknown>(url: string, params?: SearchParams, headers?: HeadersInit): Promise<T> => {
      return instance(url, {
        ...config,
        method: 'get',
        params,
        headers,
      })
    },
    post: <T = unknown>(url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, {
        method: 'post',
        body,
        headers,
      })
    },
    put: <T = unknown>(url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, {
        method: 'put',
        body,
        headers,
      })
    },
    patch: <T = unknown>(url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, {
        method: 'patch',
        body,
        headers,
      })
    },
    delete: <T = unknown>(url: string, params?: SearchParams, headers?: HeadersInit): Promise<T> => {
      return instance(url, {
        method: 'delete',
        params,
        headers,
      })
    },
    multiple: (requests: FetchRequest[]) => {
      return requests.length ? Promise.all(requests) : []
    },
  }

  return httpClient
}
