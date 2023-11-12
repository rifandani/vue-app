<script setup lang="ts">
import { loginRoute } from '@auth/routes/auth.route'
import { homeRoute } from '@home/routes/home.route'
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import { playgroundRoute } from '@playground/routes/playground.route'
import { SvgIcon } from '@shared/components/atoms'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { todosRoute } from '@todo/routes/todo.route'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheNavbarProfileMenu from './TheNavbarProfileMenu.vue'
import TheNavbarSidebar from './TheNavbarSidebar.vue'
import TheNavbarThemeMenu from './TheNavbarThemeMenu.vue'

const { LL } = typesafeI18n()
const { replace } = useRouter()
const user = useUserStorage()

const visible = ref(false)
const items = ref<MenuItem[]>([
  {
    label: 'Home',
    route: homeRoute.path
  },
  {
    label: 'Todos',
    route: todosRoute.path
  },
  {
    label: 'Playground',
    route: playgroundRoute.path
  }
])

const logout = (): void => {
  user.value = null // reset `user` store
  replace(loginRoute.path) // back to login
}
const toggleSidebar = () => {
  visible.value = true
}
</script>

<template>
  <TheNavbarSidebar v-model:visible="visible" @logout="logout" />

  <Menubar :model="items" :pt="{ popupIcon: 'hidden', button: 'hidden', menu: 'ml-auto' }">
    <template #start>
      <section class="flex items-center">
        <SvgIcon id="icon-vue" class="h-8 w-8" />
        <span class="ml-2 text-2xl font-semibold text-color-primary">{{
          LL.common.appName()
        }}</span>
      </section>
    </template>

    <template #item="{ props, item }">
      <RouterLink v-if="item.route" v-slot="{ href, navigate }" custom :to="item.route">
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          {{ item.label }}
        </a>
      </RouterLink>
    </template>

    <template #end>
      <Button aria-label="Toggle Sidebar" class="sm:hidden" @click="toggleSidebar">
        <template #icon>
          <Icon icon="lucide:menu" />
        </template>
      </Button>

      <div class="hidden items-center space-x-2 sm:flex">
        <TheNavbarThemeMenu />

        <TheNavbarProfileMenu />
      </div>
    </template>
  </Menubar>
</template>
