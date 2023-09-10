<script setup lang="ts">
import { loginRoute } from '@auth/routes/auth.route'
import { homeRoute } from '@home/routes/home.route'
import { typesafeI18n } from '@i18n/i18n-vue'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { RouterLink } from 'vue-router'

const { LL } = typesafeI18n()
const user = useUserStorage()
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center space-y-3 bg-base-100">
    <h1 class="text-3xl font-bold italic">
      {{ LL.auth.notFound404() }}
    </h1>
    <p class="mb-5">{{ LL.auth.gone() }}</p>

    <RouterLink
      data-testid="notFound-link"
      class="link hover:skew-x-12"
      :to="!!user?.id ? homeRoute.path : loginRoute.path"
    >
      {{ LL.auth.backTo({ isLoggedIn: user?.id ? 'true' : 'false' }) }}
    </RouterLink>
  </main>
</template>
