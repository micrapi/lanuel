import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(async (_nuxtApp) => {
  const authStore = useAuthStore()

  await authStore.fetch()
})
