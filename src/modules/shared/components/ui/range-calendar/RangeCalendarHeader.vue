<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<RangeCalendarHeaderProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarHeader :class="twMerge('relative flex w-full items-center justify-between pt-1', props.class)" v-bind="forwardedProps">
    <slot />
  </RangeCalendarHeader>
</template>
