<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { Primitive, type PrimitiveProps, useForwardProps } from 'radix-vue'

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <Primitive v-bind="forwardedProps">
    <slot>
      <Icon icon="lucide:dot" />
    </slot>
  </primitive>
</template>
