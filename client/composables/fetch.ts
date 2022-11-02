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
    const xdebugSession = getCookie(useRequestEvent(), runtimeConfig.xdebugCookieName)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    if (xdebugSession) {
      config.headers['Cookie'] = `${runtimeConfig.xdebugCookieName}=${xdebugSession}`
    }
  }

  const instance = $fetch.create(config)

  const httpClient = {
    get: <T = unknown> (url: string, params?: SearchParams, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge(config, {
        method: 'get',
        headers,
        params,
      }))
    },
    post: <T = unknown> (url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge(config, {
        method: 'post',
        headers,
        body,
      }))
    },
    put: <T = unknown> (url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge(config, {
        method: 'put',
        headers,
        body,
      }))
    },
    patch: <T = unknown> (url: string, body?: FetchBody, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge(config, {
        method: 'patch',
        headers,
        body,
      }))
    },
    delete: <T = unknown> (url: string, params?: SearchParams, headers?: HeadersInit): Promise<T> => {
      return instance(url, merge(config, {
        method: 'delete',
        headers,
        params,
      }))
    },
    multiple: (requests: FetchRequest[]) => {
      return requests.length ? Promise.all(requests) : []
    },
  }

  return httpClient
}
