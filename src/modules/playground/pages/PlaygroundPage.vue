<script setup lang="ts">
import WebComponents from '../components/WebComponents.vue'
</script>

<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center space-y-5 px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52"
  >
    <h1
      id="playground-title"
      class="mb-10 text-2xl font-semibold tracking-wider text-primary-content"
    >
      Playground
    </h1>

    <WebComponents />
  </main>
</template>
