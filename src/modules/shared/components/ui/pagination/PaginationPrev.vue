<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PaginationPrev, type PaginationPrevProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'
import { Icon } from '@iconify/vue'
import {
  Button,
} from '#shared/components/ui/button'

const props = withDefaults(defineProps<PaginationPrevProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationPrev v-bind="delegatedProps">
    <Button :class="twMerge('w-10 h-10 p-0', props.class)" variant="outline">
      <slot>
        <Icon icon="lucide:chevron-left" class="size-4" />
      </slot>
    </Button>
  </PaginationPrev>
</template>
