<script setup lang="ts">
import ClockSection from '#home/components/clock-section/clock-section.vue'
import { typesafeI18n } from '#i18n/i18n-vue'
import NavBar from '#shared/components/nav-bar/nav-bar.vue'

const { LL } = typesafeI18n()
</script>

<template>
  <NavBar />

  <main class="container mx-auto flex flex-col items-center py-5 duration-300">
    <h1 class="text-3xl font-medium sm:text-4xl">
      {{ LL.home.title() }}
    </h1>

    <ClockSection />
  </main>
</template>
