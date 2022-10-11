import { ElSkeleton } from 'element-plus'

export default defineComponent({
  setup () {
    return () => (
      <ElSkeleton rows={5} animated />
    )
  },
})
