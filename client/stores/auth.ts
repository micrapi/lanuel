import { defineStore } from 'pinia'
import type { FetchOptions } from 'ohmyfetch'
import type { AuthState, User } from '@/types'
import { route } from '@/utils/helpers'

interface LoginResponse {
  user: User
  token: string
}

type FetchResponse = User

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    fetched: false,
  }),
  actions: {
    async login ({ email, password, remember }) {
      try {
        const response = await useHttpFetch().post<LoginResponse>(route('api.v1.login'), {
          email,
          password,
          remember,
        })
        this.user = response.user

        return true
      } catch (e) { }

      return false
    },
    async logout () {
      try {
        await useHttpFetch().post(route('api.v1.logout'))

        return true
      } catch (e) { }

      return false
    },
    async fetch (options: FetchOptions) {
      try {
        options = options || {}
        options.method = 'get'
        options.credentials = 'include'
        options.headers = options.headers || {}
        options.headers['Accept'] = 'application/json'
        options.retry = 1

        const response = await $fetch<FetchResponse>(route('api.v1.me'), options)
        this.user = response
      } catch (e) {
        console.log(e)
        this.user = null
      }

      this.fetched = true
    },
  },
  getters: {
    id: state => state.user?.id,
  },
})
