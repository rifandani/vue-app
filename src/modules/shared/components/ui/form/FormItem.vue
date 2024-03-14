<script lang="ts" setup>
import { provide } from 'vue'
import { useId } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'
import { FORM_ITEM_INJECTION_KEY } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>

<template>
  <div :class="twMerge('space-y-2', props.class)">
    <slot />
  </div>
</template>
