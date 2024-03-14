<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span role="link" aria-disabled="true" aria-current="page" :class="twMerge('font-normal text-foreground', props.class)">
    <slot />
  </span>
</template>
