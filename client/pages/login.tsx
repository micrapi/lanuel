import type { RouteLocationRaw } from 'vue-router'
import { ElButton, ElCol, ElForm, ElFormItem, ElInput, ElRow, ElSwitch } from 'element-plus'
import { isString } from '@vueuse/shared'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  setup () {
    definePageMeta({
      middleware: ['guest'],
    })

    const authStore = useAuthStore()
    const appConfig = useAppConfig()
    const route = useRoute()
    const router = useRouter()
    const back = route.query.back
    let backTo: RouteLocationRaw

    if (back && isString(back) && router.hasRoute(back)) {
      backTo = { name: back }
    } else {
      backTo = { name: appConfig.auth.redirect.login }
    }

    const form = reactive({
      email: '',
      password: '',
      remember: false,
    })

    const login = async () => {
      const result = await authStore.login(form)

      if (result === true) {
        const redirect = router.resolve(backTo)

        window.location.href = redirect.href
      }
    }

    return () => (
      <div class="container">
        <ElRow>
          <ElCol span={12} offset={6}>
            <ElForm model={form} labelWidth="90px">
              <ElFormItem label="Email">
                <ElInput v-model={form.email}></ElInput>
              </ElFormItem>
              <ElFormItem label="Password">
                <ElInput v-model={form.password} type="password"></ElInput>
              </ElFormItem>
              <ElFormItem label="Remember">
                <ElSwitch v-model={form.remember} />
              </ElFormItem>
              <ElFormItem>
                <ElButton type="primary" onClick={login}>Login</ElButton>
              </ElFormItem>
            </ElForm>
          </ElCol>
        </ElRow>
      </div>
    )
  },
})
