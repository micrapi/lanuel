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
        const response = await useHttpClient<LoginResponse>().post(route('api.v1.login'), {
          email,
          password,
          remember,
        })
        this.user = response.data.user

        return true
      } catch (e) { }

      return false
    },
    async logout () {
      try {
        await useHttpClient().post(route('api.v1.logout'))

        return true
      } catch (e) { }

      return false
    },
    async fetch () {
      try {
        const response = await useHttpClient().get(route('api.v1.me'))
        this.user = response.data
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
