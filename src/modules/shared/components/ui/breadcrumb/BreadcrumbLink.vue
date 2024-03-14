<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
  as: 'a',
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="twMerge('transition-colors hover:text-foreground', props.class)">
    <slot />
  </Primitive>
</template>
