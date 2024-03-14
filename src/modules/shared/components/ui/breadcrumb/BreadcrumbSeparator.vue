<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li role="presentation" aria-hidden="true" :class="twMerge('[&>svg]:size-3.5', props.class)">
    <slot>
      <Icon icon="lucide:chevron-right" />
    </slot>
  </li>
</template>
