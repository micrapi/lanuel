import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  if (!authStore.fetched) {
    await authStore.fetch()
  }

  if (authStore.user) {
    return navigateTo('/')
  }
})
