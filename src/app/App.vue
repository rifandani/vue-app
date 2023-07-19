<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppToastProvider from './AppToastProvider.vue'
</script>

<template>
  <AppToastProvider>
    <RouterView />
  </AppToastProvider>
</template>
