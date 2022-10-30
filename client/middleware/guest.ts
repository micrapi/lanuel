import { getCookie } from 'h3'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  if (!authStore.fetched) {
    const runtimeConfig = useRuntimeConfig()
    const headers: HeadersInit = {}

    if (process.server) {
      const token = getCookie(useRequestEvent(), runtimeConfig.authCookieName)

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    await authStore.fetch({
      baseURL: runtimeConfig.apiUrl,
      headers,
    })
  }

  if (authStore.user) {
    return navigateTo('/')
  }
})
