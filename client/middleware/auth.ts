import { getCookie } from 'h3'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.fetched) {
    const runtimeConfig = useRuntimeConfig()
    const headers: HeadersInit = {}

    if (process.server) {
      const token = getCookie(useRequestEvent(), runtimeConfig.authCookieName)
      const xdebugSession = getCookie(useRequestEvent(), runtimeConfig.xdebugCookieName)

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      if (xdebugSession) {
        headers.Cookie = `${runtimeConfig.xdebugCookieName}=${xdebugSession}`
      }
    }

    await authStore.fetch({
      baseURL: runtimeConfig.apiUrl,
      headers,
    })
  }

  if (!authStore.user) {
    return navigateTo({
      name: 'login',
      query: {
        back: to.name.toString(),
      },
    })
  }
})
