<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    :class="twMerge(
      'ml-auto text-xs tracking-widest text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
