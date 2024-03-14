<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PaginationNext, type PaginationNextProps } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'
import {
  Button,
} from '#shared/components/ui/button'

const props = withDefaults(defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationNext v-bind="delegatedProps">
    <Button :class="twMerge('w-10 h-10 p-0', props.class)" variant="outline">
      <slot>
        <Icon icon="lucide:chevron-right" class="size-4" />
      </slot>
    </Button>
  </PaginationNext>
</template>
