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
      'mt-auto flex flex-col gap-2 p-4',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
