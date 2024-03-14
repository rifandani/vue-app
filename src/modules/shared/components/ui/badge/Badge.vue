<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'
import { type BadgeVariants, badgeVariants } from '.'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="twMerge(badgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
