<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PaginationEllipsis, type PaginationEllipsisProps } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationEllipsis v-bind="delegatedProps" :class="twMerge('w-9 h-9 flex items-center justify-center', props.class)">
    <slot>
      <Icon icon="lucide:more-horizontal" />
    </slot>
  </PaginationEllipsis>
</template>
