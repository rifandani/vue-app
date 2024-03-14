<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogTitle, type AlertDialogTitleProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogTitle
    v-bind="delegatedProps"
    :class="twMerge('text-lg font-semibold', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
