<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'
import type { HtmlHTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HtmlHTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="twMerge(
      'grid gap-1.5 p-4 text-center sm:text-left',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
