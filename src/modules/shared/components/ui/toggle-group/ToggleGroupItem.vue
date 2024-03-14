<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, computed, inject } from 'vue'
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'
import { toggleVariants } from '#shared/components/ui/toggle'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
}>()

const context = inject<ToggleGroupVariants>('toggleGroup')

const delegatedProps = computed(() => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { class: _, variant, size, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps" :class="twMerge(
      toggleVariants({
        variant: context?.variant || variant,
        size: context?.size || size,
      }),
      props.class,
    )"
  >
    <slot />
  </ToggleGroupItem>
</template>
