<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItemDelete
    v-bind="forwardedProps" :class="twMerge(
      'flex rounded bg-transparent mr-1',
      props.class,
    )"
  >
    <slot>
      <Icon icon="lucide:x" class="size-4" />
    </slot>
  </TagsInputItemDelete>
</template>
