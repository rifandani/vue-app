<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'
import { buttonVariants } from '#shared/components/ui/button'

const props = defineProps<RangeCalendarNextProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarNext
    :class="twMerge(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <Icon icon="lucide:chevron-right" class="size-4" />
    </slot>
  </RangeCalendarNext>
</template>
