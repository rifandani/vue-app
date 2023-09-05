<script setup lang="ts">
import { typesafeI18n } from '@i18n/i18n-vue'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { modes } from '@shared/constants/global.constant'
import { useColorMode } from '@vueuse/core'

const emit = defineEmits<{
  logout: []
}>()

const { LL } = typesafeI18n()
const user = useUserStorage()
const colorMode = useColorMode({
  modes,
  attribute: 'data-theme'
})
</script>

<template>
  <li>
    <RouterLink
      role="link"
      aria-label="todos"
      :to="{ name: 'todos' }"
      active-class="link-secondary"
      class="link-hover link mx-0 px-3 tracking-wide text-primary lg:mx-3"
    >
      Todos
    </RouterLink>
  </li>

  <li class="dropdown dropdown-top mb-3 mt-auto lg:dropdown-end lg:dropdown-bottom lg:my-0">
    <button
      type="button"
      tabindex="0"
      class="btn btn-secondary btn-sm btn-block normal-case text-secondary-content"
    >
      {{ LL.common.theme() }}
    </button>

    <ul
      tabindex="0"
      class="menu dropdown-content rounded-box z-10 block max-h-60 w-72 overflow-y-auto bg-secondary p-2 text-secondary-content shadow lg:w-52"
    >
      <li v-for="mode in modes" :key="mode">
        <button
          class="capitalize tracking-wide"
          type="button"
          :aria-label="`mode-${mode}`"
          @click="colorMode = mode"
        >
          {{ mode }}
        </button>
      </li>
    </ul>
  </li>

  <li v-if="user" class="ml-0 lg:ml-3 lg:mt-0">
    <button
      type="button"
      class="btn btn-primary btn-sm normal-case tracking-wide text-primary-content"
      @click="emit('logout')"
    >
      {{ LL.auth.logoutUsername({ username: user.username }) }}
    </button>
  </li>
</template>
