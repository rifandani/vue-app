<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span role="presentation" aria-hidden="true" :class="twMerge('flex h-9 w-9 items-center justify-center', props.class)">
    <slot>
      <Icon icon="lucide:more-horizontal" class="size-4" />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
