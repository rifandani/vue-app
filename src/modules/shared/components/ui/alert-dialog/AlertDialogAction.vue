<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'
import { buttonVariants } from '../button'

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps" :class="twMerge(buttonVariants(), props.class)">
    <slot />
  </AlertDialogAction>
</template>
