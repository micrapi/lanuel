import { getCookie } from 'h3'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()
  const token = getCookie(nuxtApp.ssrContext?.event, runtimeConfig.authCookieName)
  const headers: HeadersInit = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  await authStore.fetch({
    baseURL: runtimeConfig.apiUrl,
    headers,
  })
})
