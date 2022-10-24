import { defineStore } from 'pinia'
import type { AuthState, User } from '@/types'
import { route } from '@/utils/helpers'

interface LoginResponse {
  user: User
  token: string
}

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
    async fetch () {
      try {
        const response = await useHttpFetch().get(route('api.v1.me'))
        this.user = response
      } catch (e) {
        this.user = null
      }

      this.fetched = true
    },
  },
  getters: {
    id: state => state.user?.id,
  },
})
