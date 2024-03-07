<script setup lang="ts">
import { watchEffect } from 'vue'

const props = defineProps<{
  log: any
  dir?: any
}>()

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: LogConsole.vue:7 ~ props.log:', props)

  if (props?.dir)
    // eslint-disable-next-line no-console
    console.dir('🚀 ~ file: LogConsole.vue:8 ~ props.dir:', props)
})
</script>
