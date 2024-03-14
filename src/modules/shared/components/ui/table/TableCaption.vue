<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <caption :class="twMerge('mt-4 text-sm text-muted-foreground', props.class)">
    <slot />
  </caption>
</template>
