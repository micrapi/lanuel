import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus)
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
  })
})
