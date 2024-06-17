<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { LabelProps } from 'radix-vue'
import { twMerge } from 'tailwind-merge'
import { Label } from '../label'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <Label
    :class="twMerge(
      error && 'text-destructive',
      props.class,
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
