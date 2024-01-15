<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'
import Listeners from '#app/listeners.vue'
import ReloadPromptSw from '#app/reload-prompt-sw.vue'
</script>

<template>
  <Listeners>
    <RouterView />
    <Toast position="bottom-center" />
    <VueQueryDevtools button-position="bottom-right" :initial-is-open="false" />
    <ReloadPromptSw />
  </Listeners>
</template>
