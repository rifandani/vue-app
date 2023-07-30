<script setup lang="ts">
const props = defineProps<{
  log: any
  dir?: any
}>()

console.log('🚀 ~ file: LogConsole.vue:7 ~ props.log:', props)
if (props?.dir) console.dir('🚀 ~ file: LogConsole.vue:8 ~ props.dir:', props)
</script>

<template>
  {{ null }}
</template>
