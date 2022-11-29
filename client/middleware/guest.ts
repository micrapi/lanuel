import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (authStore.user) {
    return navigateTo({ name: 'index' })
  }
})
