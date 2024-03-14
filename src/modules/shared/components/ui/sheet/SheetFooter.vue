<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      twMerge(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
