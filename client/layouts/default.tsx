export default defineComponent({
  setup (_props, { slots }) {
    return () => (
      <div class="container">
        {slots.default()}
      </div>
    )
  },
})
