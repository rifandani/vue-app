<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { twMerge } from 'tailwind-merge'
import { useFormField } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { formDescriptionId } = useFormField()
</script>

<template>
  <p
    :id="formDescriptionId"
    :class="twMerge(
      'text-sm text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </p>
</template>
