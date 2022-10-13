import { ElSkeleton } from 'element-plus'
import { NuxtLink } from '#components'

export default defineComponent({
  setup () {
    return () => (
      <div>
        <ElSkeleton rows={5} animated />
        <NuxtLink to={'/account'}>My Account</NuxtLink> | <NuxtLink to={'/login'}>Login</NuxtLink>
      </div>
    )
  },
})
