<script setup lang="ts">
// could also extends SVGAttributes
type Props = {
  id: 'icon-vue'
}

const props = defineProps<Props>()
</script>

<template>
  <!-- v-bind="props" -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
  >
    <use :href="`#${props.id}`" />
  </svg>
</template>
