<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  /**
   * The variant
   */
  variant?: ButtonVariants['variant']
  /**
   * The size
   */
  size?: ButtonVariants['size']
  /**
   * The element or component this component should render as
   * @defaultValue — "button"
   */
  as?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="twMerge(buttonVariants({ variant, size }), props.class)">
    <slot />
  </Primitive>
</template>
