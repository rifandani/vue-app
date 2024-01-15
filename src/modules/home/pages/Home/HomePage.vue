<script setup lang="ts">
import HomeClock from '#home/components/HomeClock/HomeClock.vue'
import { typesafeI18n } from '#i18n/i18n-vue'
import TheNavbar from '#shared/components/organisms/TheNavbar/TheNavbar.vue'

const { LL } = typesafeI18n()
</script>

<template>
  <TheNavbar />

  <main class="container mx-auto flex flex-col items-center py-5 duration-300">
    <h1 class="text-3xl font-medium sm:text-4xl">
      {{ LL.home.title() }}
    </h1>

    <HomeClock />
  </main>
</template>
