<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { MenubarLabel, type MenubarLabelProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps<MenubarLabelProps & { class?: HTMLAttributes['class'], inset?: boolean }>()
</script>

<template>
  <MenubarLabel :class="twMerge('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)">
    <slot />
  </MenubarLabel>
</template>
