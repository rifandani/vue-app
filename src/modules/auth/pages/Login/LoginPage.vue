<script setup lang="ts">
import vueschool from '@assets/vueschool.svg'
import LoginForm from '@auth/components/LoginForm/LoginForm.vue'
import { homeRoute } from '@home/routes/home.route'
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import { WrapTranslation } from '@shared/components/atoms'
import { RouterLink } from 'vue-router'

const { LL } = typesafeI18n()
</script>

<template>
  <main class="h-screen bg-white">
    <div class="flex w-full flex-wrap">
      <!-- Login Section -->
      <section class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <RouterLink
            role="link"
            aria-label="link-home"
            class="relative cursor-pointer rounded-full hover:text-primary"
            :to="homeRoute.path"
          >
            <Icon icon="lucide:home" height="1.5em" />
          </RouterLink>
        </div>

        <div
          class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32"
        >
          <h1 class="text-center text-3xl text-primary">
            {{ LL.auth.welcome() }}
          </h1>

          <LoginForm />

          <p class="py-12 text-center">
            <WrapTranslation v-slot="{ infix }" :message="LL.auth.registerHere()">
              <RouterLink
                role="link"
                aria-label="link-register"
                to="/register"
                class="link-primary link"
                >{{ infix }}</RouterLink
              >
            </WrapTranslation>
          </p>
        </div>
      </section>

      <!-- Image Section -->
      <section class="w-1/2 shadow-2xl">
        <span class="relative hidden h-screen w-full md:flex md:items-center md:justify-center">
          <img
            aria-label="img-cover"
            class="h-full object-cover object-right"
            alt="login page cover"
            loading="lazy"
            :src="vueschool"
          />
        </span>
      </section>
    </div>
  </main>
</template>
