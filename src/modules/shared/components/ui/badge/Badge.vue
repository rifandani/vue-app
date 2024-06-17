<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'
import { type BadgeVariants, badgeVariants } from '.'

const props = defineProps<{
  /**
   * The color variant
   */
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="twMerge(badgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
