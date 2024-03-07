<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loginRoute } from '#auth/routes'
import { homeRoute } from '#home/routes'
import { useUserStorage } from '#shared/composables/use-user-storage'

const { t } = useI18n()
const user = useUserStorage()
</script>

<template>
  <main class="bg-base-100 flex h-screen flex-col items-center justify-center space-y-3">
    <h1 class="text-3xl font-bold italic">
      {{ t('auth.404') }}
    </h1>
    <p class="mb-5">
      {{ t("auth.gone") }}
    </p>

    <RouterLink
      data-testid="notFound-link" class="link hover:skew-x-12"
      :to="!!user?.id ? homeRoute.path : loginRoute.path"
    >
      {{ t('auth.backTo', { path: user?.id ? 'home' : 'login' }) }}
    </RouterLink>
  </main>
</template>
