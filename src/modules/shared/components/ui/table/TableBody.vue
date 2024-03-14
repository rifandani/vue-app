<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tbody :class="twMerge('[&_tr:last-child]:border-0', props.class)">
    <slot />
  </tbody>
</template>
