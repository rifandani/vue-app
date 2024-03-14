<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="twMerge('flex cursor-default items-center justify-center py-1', props.class)">
    <slot>
      <Icon icon="lucide:chevron-up" class="size-4" />
    </slot>
  </SelectScrollUpButton>
</template>
