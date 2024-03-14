<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ClockSection from '#home/components/clock-section/clock-section.vue'
import NavBar from '#shared/components/nav-bar.vue'

const { t } = useI18n()
</script>

<template>
  <NavBar />

  <main class="container mx-auto flex h-full flex-col items-center py-5 duration-300">
    <h1 class="dark:text-surface-100 text-3xl font-medium sm:text-4xl">
      {{ t('common.appName') }}
    </h1>

    <ClockSection />
  </main>
</template>
