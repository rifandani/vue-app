<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
import Listeners from '#app/listeners.vue'
import { Toaster } from '#shared/components/ui/sonner'
</script>

<template>
  <Listeners>
    <RouterView />
  </Listeners>
  <Toaster :duration="3_000" position="bottom-right" />
  <VueQueryDevtools button-position="bottom-left" />
</template>
