<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastDescription, type ToastDescriptionProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<ToastDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastDescription :class="twMerge('text-sm opacity-90', props.class)" v-bind="delegatedProps">
    <slot />
  </ToastDescription>
</template>
