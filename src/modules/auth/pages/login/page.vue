<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { I18nT, useI18n } from 'vue-i18n'
import starScatter from '#assets/star-scatter.svg'
import LoginForm from '#auth/components/login-form/login-form.vue'
import { homeRoute } from '#home/routes'

const { t } = useI18n()
</script>

<template>
  <main class="h-screen bg-white font-sans">
    <div class="flex w-full flex-wrap">
      <!-- Login Section -->
      <section class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <RouterLink
            role="link" aria-label="link-home"
            class="relative cursor-pointer rounded-full" :to="homeRoute.path"
          >
            <Icon icon="lucide:home" height="1.5em" />
          </RouterLink>
        </div>

        <div class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
          <h1 class="text-center text-3xl">
            {{ t('auth.welcome') }}
          </h1>

          <LoginForm />

          <I18nT keypath="auth.dontHaveAccount" tag="p" class="py-12 text-center">
            <RouterLink role="link" aria-label="link-register" to="/register" class="no-underline">
              {{ t('auth.registerHere') }}
            </RouterLink>
          </I18nT>
        </div>
      </section>

      <!-- Image Section -->
      <section class="w-1/2 shadow-2xl">
        <span class="relative hidden h-screen w-full md:flex md:items-center md:justify-center">
          <img
            aria-label="img-cover" class="h-full w-[inherit] object-cover object-right" alt="login page cover"
            loading="lazy" :src="starScatter"
          >
        </span>
      </section>
    </div>
  </main>
</template>
