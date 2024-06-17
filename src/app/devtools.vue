<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { defineAsyncComponent, onMounted, ref } from 'vue'

const VueQueryDevtoolsProduction = defineAsyncComponent(() =>
  import('@tanstack/vue-query-devtools'),
)
const showDevtools = ref(false)

onMounted(() => {
  window.toggleRqDevtools = () => {
    showDevtools.value = !showDevtools.value
  }
})
</script>

<template>
  <!-- this will only be rendered in development -->
  <VueQueryDevtools button-position="bottom-left" />

  <!-- this could be rendered in production, by calling `window.toggleRqDevtools()` -->
  <Suspense v-if="showDevtools">
    <VueQueryDevtoolsProduction />
  </Suspense>
</template>
