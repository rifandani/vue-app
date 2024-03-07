<script setup lang="ts">
import { ref, toValue, watchEffect } from 'vue'

interface Props {
  message: string
}

const props = defineProps<Props>()

const value = toValue(props)
const prefix = ref(value.message.split('<>')[0])
const infix = ref(value.message.split('<>')[1])
const postfix = ref(value.message.split('<>')[2])

watchEffect(() => {
  // render infix only if the message doesn't have any split characters
  if (!infix.value && !postfix.value) {
    infix.value = prefix.value
    prefix.value = ''
  }
})
</script>

<template>
  {{ prefix }}
  <slot :infix="infix" />
  {{ postfix }}
</template>
