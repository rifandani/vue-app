<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h5 :class="twMerge('mb-1 font-medium leading-none tracking-tight', props.class)">
    <slot />
  </h5>
</template>
