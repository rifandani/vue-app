<script setup lang="ts">
import TheDirectives from '#playground/components/the-directives.vue'
import WebComponents from '#playground/components/web-components.vue'
</script>

<template>
  <main class="container mx-auto flex flex-col items-center py-5 duration-300">
    <h1 data-testid="title" class="text-3xl font-medium sm:text-4xl">
      Playground
    </h1>

    <WebComponents />
    <TheDirectives />
  </main>
</template>
