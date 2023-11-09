<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
import AppToastProvider from './AppToastProvider.vue'
</script>

<template>
  <AppToastProvider>
    <RouterView />
    <VueQueryDevtools button-position="bottom-left" :initial-is-open="false" />
  </AppToastProvider>
</template>
