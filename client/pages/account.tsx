import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  setup () {
    definePageMeta({
      middleware: ['auth'],
    })

    const authStore = useAuthStore()

    return () => (
      <div class={'container'}>{`Account ${authStore.user.email}`}</div>
    )
  },
})
