<script setup lang="ts">
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { NavBar } from '../../../shared/components/organisms'
import HomeClock from '../../components/HomeClock/HomeClock.vue'

const { LL } = typesafeI18n()
</script>

<template>
  <NavBar>
    <main
      class="container mx-auto flex flex-col items-center py-24 text-primary-content duration-300"
    >
      <h1
        data-testid="home-title"
        class="mb-4 text-3xl font-medium text-primary-content sm:text-4xl"
      >
        {{ LL.home.title() }}
      </h1>

      <HomeClock />
    </main>
  </NavBar>
</template>
