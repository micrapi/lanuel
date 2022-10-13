export default defineComponent({
  setup () {
    definePageMeta({
      middleware: ['auth'],
    })

    return () => (
      <div>Account</div>
    )
  },
})
