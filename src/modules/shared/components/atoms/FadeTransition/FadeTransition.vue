<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <Transition name="fade" v-bind="$attrs">
    <slot></slot>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
