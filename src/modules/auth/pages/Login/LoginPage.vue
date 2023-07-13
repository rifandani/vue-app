<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import vueschool from '../../../../assets/vueschool.svg'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { WrapTranslation } from '../../../shared/components/atoms'
import LoginForm from '../../components/LoginForm/LoginForm.vue'

const { LL } = typesafeI18n()
</script>

<template>
  <main class="h-screen bg-white">
    <div class="flex w-full flex-wrap">
      <!-- Login Section -->
      <section class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <RouterLink to="/" class="relative cursor-pointer rounded-full hover:text-primary">
            <Icon icon="lucide:home" height="1.5em" />
          </RouterLink>
        </div>

        <div
          class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32"
        >
          <p class="text-center text-3xl text-primary" data-testid="title">
            {{ LL.auth.welcome() }}
          </p>

          <LoginForm />

          <div class="py-12 text-center">
            <p>
              <WrapTranslation v-slot="{ infix }" :message="LL.auth.registerHere()">
                <RouterLink to="/register" class="link-primary link">{{ infix }}</RouterLink>
              </WrapTranslation>
            </p>
          </div>
        </div>
      </section>

      <!-- Image Section -->
      <section class="w-1/2 shadow-2xl">
        <span class="relative hidden h-screen w-full md:flex md:items-center md:justify-center">
          <img
            :src="vueschool"
            class="h-full object-cover object-right"
            alt="login page cover"
            loading="lazy"
          />
        </span>
      </section>
    </div>
  </main>
</template>
