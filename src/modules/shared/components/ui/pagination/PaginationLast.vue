<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PaginationLast, type PaginationLastProps } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'
import {
  Button,
} from '../button'

const props = withDefaults(defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationLast v-bind="delegatedProps">
    <Button :class="twMerge('w-10 h-10 p-0', props.class)" variant="outline">
      <slot>
        <Icon icon="lucide:chevrons-right" class="size-4" />
      </slot>
    </Button>
  </PaginationLast>
</template>
