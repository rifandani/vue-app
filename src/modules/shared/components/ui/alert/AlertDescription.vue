<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="twMerge('text-sm [&_p]:leading-relaxed', props.class)">
    <slot />
  </div>
</template>
