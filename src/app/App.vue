<script setup lang="ts">
import { themeChange } from 'theme-change'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => themeChange(false))
</script>

<template>
  <RouterView />
</template>
