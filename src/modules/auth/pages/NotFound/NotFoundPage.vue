<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import type { LoginApiResponseSchema } from '../../api/auth.schema'

const { LL } = typesafeI18n()
const user = useLocalStorage<LoginApiResponseSchema | null>('user', null)
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center space-y-3 text-primary-content">
    <h1 data-testid="notFound-title" class="text-3xl font-bold italic">
      {{ LL.auth.notFound404() }}
    </h1>
    <p data-testid="notFound-subtitle" class="mb-5">{{ LL.auth.gone() }}</p>

    <Link href="/" data-testid="notFound-link" class="link-neutral link hover:skew-x-12">
      {{ LL.auth.backTo({ isLoggedIn: user?.id ? 'true' : 'false' }) }}
    </Link>
  </main>
</template>
