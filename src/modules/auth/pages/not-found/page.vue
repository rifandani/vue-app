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
  <main
    className="font-mono flex min-h-screen flex-col items-center justify-center opacity-80 bg-[radial-gradient(oklch(var(--p))_0.5px_,transparent_0.5px),radial-gradient(oklch(var(--p))_0.5px_,oklch(var(--b1))_0.5px)] bg-[0_0_,10px_10px] bg-[length:20px_20px]"
  >
    <h1 className="text-8xl font-bold tracking-wider text-primary">
      404
    </h1>
    <h2 className="my-3 text-2xl font-semibold">
      {{ t('auth.notFound') }}
    </h2>
    <p className="text-md text-base-content">
      {{ t("auth.gone") }}
    </p>

    <RouterLink
      data-testid="notFound-link" class="mt-10 hover:skew-x-12"
      :to="!!user?.id ? homeRoute.path : loginRoute.path"
    >
      {{ t('common.backTo', { path: user?.id ? 'home' : 'login' }) }}
    </RouterLink>
  </main>
</template>
