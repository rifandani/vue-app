<script setup lang="ts">
import TheDirectives from '@playground/components/TheDirectives.vue'
import WebComponents from '@playground/components/WebComponents.vue'
</script>

<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center space-y-5 px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52"
  >
    <h1 data-testid="title" class="mb-10 text-2xl font-semibold tracking-wider">Playground</h1>

    <WebComponents />
    <TheDirectives />
  </main>
</template>
