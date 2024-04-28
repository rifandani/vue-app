<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogCancel, type AlertDialogCancelProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'
import { buttonVariants } from '../button'

const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogCancel v-bind="delegatedProps" :class="twMerge(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', props.class)">
    <slot />
  </AlertDialogCancel>
</template>
