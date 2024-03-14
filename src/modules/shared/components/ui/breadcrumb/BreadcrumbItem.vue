<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li :class="twMerge('inline-flex items-center gap-1.5', props.class)">
    <slot />
  </li>
</template>
