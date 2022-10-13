import { defineStore } from 'pinia'
import type { AuthState } from '@/types'
import { route } from '@/utils/helpers'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    fetched: false,
  }),
  actions: {
    async login ({ email, password, remember }) {
      try {
        const response = await useHttpClient().post(route('api.v1.login'), {
          email,
          password,
          remember,
        })
        this.user = response.user
      } catch (e) {}
    },
    async fetch () {
      try {
        const response = await useHttpClient().get(route('api.v1.me'))
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
