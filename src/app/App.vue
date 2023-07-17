<script setup lang="ts">
import { themeChange } from 'theme-change'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppToastProvider from './AppToastProvider.vue'

onMounted(() => themeChange(false))
</script>

<template>
  <AppToastProvider>
    <RouterView />
  </AppToastProvider>
</template>
