<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { MenubarSeparator, type MenubarSeparatorProps, useForwardProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<MenubarSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarSeparator :class="twMerge('-mx-1 my-1 h-px bg-muted', props.class)" v-bind="forwardedProps" />
</template>
