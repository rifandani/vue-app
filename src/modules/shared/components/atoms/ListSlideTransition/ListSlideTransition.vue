<script setup lang="ts">
const props = defineProps<{
  css?: boolean
  duration?:
    | number
    | {
        enter: number
        leave: number
      }
}>()
</script>

<template>
  <TransitionGroup name="list" v-bind="props">
    <slot></slot>
  </TransitionGroup>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
