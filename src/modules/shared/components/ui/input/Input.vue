<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'
import { type InputVariants, inputVariants } from '.'

interface Props {
  variant?: InputVariants['variant']
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue" :class="twMerge(
      inputVariants({ variant }),
      props.class,
    )"
  >
</template>
