<script setup lang="ts">
import { RouterView } from 'vue-router'
import Listeners from '#app/listeners.vue'
import Devtools from '#app/devtools.vue'
import { Toaster } from '#shared/components/ui/sonner'
</script>

<template>
  <Listeners>
    <RouterView />
  </Listeners>

  <Toaster :duration="3_000" position="bottom-right" />
  <Devtools />
</template>
