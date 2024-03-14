<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      twMerge('flex flex-col gap-y-2 text-center sm:text-left', props.class)
    "
  >
    <slot />
  </div>
</template>
