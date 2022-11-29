import { ElButton, ElContainer, ElDropdown, ElDropdownItem, ElDropdownMenu, ElHeader, ElMain } from 'element-plus'
import { ClientOnly, NuxtLink } from '#components'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  setup (_props, { slots }) {
    const authStore = useAuthStore()
    const appConfig = useAppConfig()
    const router = useRouter()

    const logout = async (e: MouseEvent) => {
      e.preventDefault()

      const result = await authStore.logout()

      if (result === true) {
        const redirect = router.resolve({ name: appConfig.auth.redirect.logout })

        window.location.href = redirect.href
      }
    }

    return () => (
      <div class="layout-wrapper">
        <ElContainer>
          <ElHeader height="60px">
            <ElContainer class={'container'}>
              <NuxtLink to={'/'}><h1 class="logo">Lanuel</h1></NuxtLink>
              <div class="menu">{
                authStore.id
                  ? (<ClientOnly>
                    <ElDropdown trigger={'click'}>{
                      {
                        default: () => <ElButton link>{authStore.user?.name}</ElButton>,
                        dropdown: () => (
                          <ElDropdownMenu>
                            <ElDropdownItem><NuxtLink to={'/account'}>Account</NuxtLink></ElDropdownItem>
                            <ElDropdownItem onClick={logout}>Logout</ElDropdownItem>
                          </ElDropdownMenu>
                        ),
                      }
                    }</ElDropdown>
                  </ClientOnly>)
                  : (<div class="links">
                    <NuxtLink class="el-button is-link" to={'/login'}>Login</NuxtLink>
                  </div>)
              }</div>
            </ElContainer>
          </ElHeader>
          <ElMain>
            {slots.default?.()}
          </ElMain>
        </ElContainer>
      </div>
    )
  },
})
