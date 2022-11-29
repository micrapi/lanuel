import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (!authStore.user) {
    return navigateTo({
      name: 'login',
      query: {
        back: to.name?.toString(),
      },
    })
  }
})
