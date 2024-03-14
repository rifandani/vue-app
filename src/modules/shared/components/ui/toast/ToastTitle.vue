<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastTitle, type ToastTitleProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastTitle v-bind="delegatedProps" :class="twMerge('text-sm font-semibold', props.class)">
    <slot />
  </ToastTitle>
</template>
