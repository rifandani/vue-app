<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { typesafeI18n } from '@/i18n/i18n-vue'
import type { LoginApiResponseSchema } from '@/modules/auth/api/auth.schema'
import { themes } from '@/modules/shared/constants/global.constant'

const emit = defineEmits<{
  logout: []
}>()

const { LL } = typesafeI18n()
const user = useLocalStorage<LoginApiResponseSchema | null>('user', null)
</script>

<template>
  <li>
    <!-- inactiveClassName: 'link-neutral' -->
    <RouterLink
      to="/todos"
      active-class="link-secondary"
      class="link-hover link mx-0 px-3 tracking-wide text-primary lg:mx-3"
    >
      Todos
    </RouterLink>
  </li>
  <li class="dropdown-top dropdown mb-3 mt-auto lg:dropdown-bottom lg:dropdown-end lg:my-0">
    <button
      tabindex="0"
      class="btn-secondary btn-block btn-sm btn normal-case text-secondary-content"
    >
      {{ LL.common.theme() }}
    </button>

    <ul
      tabindex="0"
      class="dropdown-content menu rounded-box z-10 block max-h-60 w-72 overflow-y-auto bg-secondary p-2 text-secondary-content shadow lg:w-52"
    >
      <li v-for="theme in themes" :key="theme">
        <button class="capitalize tracking-wide" :data-set-theme="theme">{{ theme }}</button>
      </li>
    </ul>
  </li>

  <li v-if="user?.username" class="ml-0 lg:ml-3 lg:mt-0">
    <button
      class="btn-primary btn-sm btn normal-case tracking-wide text-primary-content"
      @click="emit('logout')"
    >
      {{ LL.auth.logoutUsername({ username: user.username }) }}
    </button>
  </li>
</template>
