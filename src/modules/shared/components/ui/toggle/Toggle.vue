<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'radix-vue'
import { twMerge } from 'tailwind-merge'
import { type ToggleVariants, toggleVariants } from '.'

const props = withDefaults(defineProps<ToggleProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
})

const emits = defineEmits<ToggleEmits>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { class: _, size, variant, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Toggle
    v-bind="forwarded"
    :class="twMerge(toggleVariants({ variant, size }), props.class)"
  >
    <slot />
  </Toggle>
</template>
