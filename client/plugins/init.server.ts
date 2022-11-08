import { getCookie } from 'h3'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()
  const headers: HeadersInit = {}

  if (nuxtApp.ssrContext) {
    const token = getCookie(nuxtApp.ssrContext.event, runtimeConfig.authCookieName)
    const xdebugSession = getCookie(nuxtApp.ssrContext.event, runtimeConfig.xdebugCookieName)

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
})
