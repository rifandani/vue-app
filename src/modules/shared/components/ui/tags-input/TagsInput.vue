<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'radix-vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<TagsInputRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TagsInputRoot
    v-bind="forwarded" :class="twMerge(
      'flex flex-wrap gap-2 items-center rounded-md border border-input bg-background px-3 py-2 text-sm',
      props.class,
    )"
  >
    <slot />
  </TagsInputRoot>
</template>
