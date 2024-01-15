<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { loginRoute } from '#auth/routes'
import { homeRoute } from '#home/routes'
import { typesafeI18n } from '#i18n/i18n-vue'
import { useUserStorage } from '#shared/composables/use-user-storage'

const { LL } = typesafeI18n()
const user = useUserStorage()
</script>

<template>
  <main class="bg-base-100 flex h-screen flex-col items-center justify-center space-y-3">
    <h1 class="text-3xl font-bold italic">
      {{ LL.auth.notFound404() }}
    </h1>
    <p class="mb-5">
      {{ LL.auth.gone() }}
    </p>

    <RouterLink
      data-testid="notFound-link" class="link hover:skew-x-12"
      :to="!!user?.id ? homeRoute.path : loginRoute.path"
    >
      {{ LL.auth.backTo({ isLoggedIn: user?.id ? 'true' : 'false' }) }}
    </RouterLink>
  </main>
</template>
