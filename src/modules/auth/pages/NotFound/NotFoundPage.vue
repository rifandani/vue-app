<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { useUserStorage } from '../../../shared/composables/useUserStorage/useUserStorage.composable'

const { LL } = typesafeI18n()
const user = useUserStorage()
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center space-y-3 text-primary-content">
    <h1 id="notFound-title" class="text-3xl font-bold italic">
      {{ LL.auth.notFound404() }}
    </h1>
    <p id="notFound-subtitle" class="mb-5">{{ LL.auth.gone() }}</p>

    <RouterLink id="notFound-link" to="/" class="link text-primary-content hover:skew-x-12">
      {{ LL.auth.backTo({ isLoggedIn: user?.id ? 'true' : 'false' }) }}
    </RouterLink>
  </main>
</template>
