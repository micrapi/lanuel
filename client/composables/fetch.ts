import { getCookie } from 'h3'
import type { FetchOptions, SearchParams } from 'ohmyfetch'
import merge from 'lodash/merge'
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
      return instance(url, merge({
        method: 'get',
      }, config, headers, params))
    },
    post: <T = unknown>(url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge({
        method: 'post',
      }, config, headers, body))
    },
    put: <T = unknown>(url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge({
        method: 'put',
      }, config, headers, body))
    },
    patch: <T = unknown>(url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge({
        method: 'patch',
      }, config, headers, body))
    },
    delete: <T = unknown>(url: string, params?: SearchParams, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge({
        method: 'delete',
      }, config, headers, params))
    },
    multiple: (requests: FetchRequest[]) => {
      return requests.length ? Promise.all(requests) : []
    },
  }

  return httpClient
}
