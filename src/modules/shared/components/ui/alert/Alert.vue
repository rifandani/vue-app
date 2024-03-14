<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'
import { type AlertVariants, alertVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
}>()
</script>

<template>
  <div :class="twMerge(alertVariants({ variant }), props.class)" role="alert">
    <slot />
  </div>
</template>
