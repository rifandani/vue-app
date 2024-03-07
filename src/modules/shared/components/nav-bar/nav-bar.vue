<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loginRoute } from '#auth/routes'
import { homeRoute } from '#home/routes'
import { playgroundRoute } from '#playground/routes'
import { useUserStorage } from '#shared/composables/use-user-storage'
import { todosRoute } from '#todo/routes'
import NavBarSidebar from '#shared/components/nav-bar/nav-bar-sidebar.vue'
import NavBarThemeMenu from '#shared/components/nav-bar/nav-bar-theme-menu.vue'
import NavBarProfileMenu from '#shared/components/nav-bar/nav-bar-profile-menu.vue'
import NavBarLanguageMenu from '#shared/components/nav-bar/nav-bar-language-menu.vue'
import SvgIcon from '#shared/components/svg-icon.vue'

const user = useUserStorage()
const { t } = useI18n()
const { replace } = useRouter()
const visible = ref(false)
const items = ref<MenuItem[]>([
  {
    label: 'Home',
    route: homeRoute.path,
  },
  {
    label: 'Todos',
    route: todosRoute.path,
  },
  {
    label: 'Playground',
    route: playgroundRoute.path,
  },
])
</script>

<template>
  <NavBarSidebar
    v-model:visible="visible" @logout="() => {
      user = null // reset `user` store
      replace(loginRoute.path) // back to login
    }"
  />

  <Menubar :model="items" :pt="{ root: 'rounded-none', popupIcon: 'hidden', button: 'hidden', menu: 'ml-auto' }">
    <template #start>
      <section class="flex items-center">
        <SvgIcon id="icon-vue" class="size-8" />
        <span class="ml-2 text-2xl font-semibold text-color-primary">{{
          t("common.appName")
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
      <Button
        aria-label="Toggle Sidebar" class="sm:hidden" @click="() => {
          visible = true
        }"
      >
        <template #icon>
          <Icon icon="lucide:menu" />
        </template>
      </Button>

      <div class="hidden items-center space-x-2 sm:flex">
        <NavBarThemeMenu />
        <NavBarLanguageMenu />
        <NavBarProfileMenu />
      </div>
    </template>
  </Menubar>
</template>
