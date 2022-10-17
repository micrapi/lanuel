import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.fetched) {
    await authStore.fetch()
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
