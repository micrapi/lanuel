import { defineStore } from 'pinia'
import type { AuthState } from '@/types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
  }),
  actions: {
    async fetch () {
      //
    },
  },
})
