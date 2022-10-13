import { ElButton, ElForm, ElFormItem, ElInput, ElSwitch } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  setup () {
    definePageMeta({
      middleware: ['guest'],
    })

    const authStore = useAuthStore()

    const form = reactive({
      email: '',
      password: '',
      remember: false,
    })

    const login = async () => {
      await authStore.login(form)
    }

    return () => (
      <ElForm model={form}>
        <ElFormItem label="Email">
          <ElInput v-model={form.email}></ElInput>
        </ElFormItem>
        <ElFormItem label="Password">
          <ElInput v-model={form.password} type="password"></ElInput>
        </ElFormItem>
        <ElFormItem label="Password">
          <ElSwitch v-model={form.remember} />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" onClick={login}>Login</ElButton>
        </ElFormItem>
      </ElForm>
    )
  },
})
