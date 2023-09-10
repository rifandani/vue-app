<script setup lang="ts">
import { typesafeI18n } from '@i18n/i18n-vue'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { modes } from '@shared/constants/global.constant'
import { todosRoute } from '@todo/routes/todo.route'
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
      class="link-hover link mx-0 px-3 tracking-wide lg:mx-3"
      :to="todosRoute.path"
    >
      Todos
    </RouterLink>
  </li>

  <li class="dropdown dropdown-top mb-3 mt-auto lg:dropdown-end lg:dropdown-bottom lg:my-0">
    <button
      type="button"
      tabindex="0"
      aria-label="themes-opener"
      class="btn btn-outline btn-sm btn-block normal-case"
    >
      {{ LL.common.theme() }}
    </button>

    <ul
      tabindex="0"
      class="menu dropdown-content rounded-box z-10 block max-h-60 w-72 overflow-y-auto bg-base-200 p-2 shadow lg:w-52"
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
      class="btn btn-error btn-sm normal-case tracking-wide text-error-content"
      @click="emit('logout')"
    >
      {{ LL.auth.logoutUsername({ username: user.username }) }}
    </button>
  </li>
</template>
