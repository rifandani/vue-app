<script setup lang="ts">
import { loginRoute } from '@auth/routes/auth.route'
import { homeRoute } from '@home/routes/home.route'
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import { SvgIcon } from '@shared/components/atoms'
import NavBarMenu from '@shared/components/organisms/NavBarMenu/NavBarMenu.vue'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { RouterLink, useRouter } from 'vue-router'

// #region VALUES
const { replace } = useRouter()
const { LL } = typesafeI18n()
const user = useUserStorage()
// #endregion

//#region HANDLERS
const logout = (): void => {
  user.value = null // reset `user` store
  replace(loginRoute.path) // back to login
}
//#endregion
</script>

<template>
  <nav class="drawer min-h-screen">
    <input id="my-nav-drawer" type="checkbox" aria-label="drawer" class="drawer-toggle" />

    <section class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar w-full shadow-md">
        <div class="flex-none lg:hidden">
          <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
          <label for="my-nav-drawer" class="btn btn-square btn-ghost">
            <Icon icon="lucide:menu" height="2em" />
          </label>
        </div>

        <RouterLink
          role="link"
          aria-label="logo"
          class="link mx-2 flex flex-1 items-center space-x-2 px-2 text-2xl"
          :to="homeRoute.path"
        >
          <SvgIcon id="icon-vue" class="h-6 w-6" />
          <p class="font-semibold tracking-wider">{{ LL.common.appName() }}</p>
        </RouterLink>

        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <NavBarMenu @logout="logout" />
          </ul>
        </div>
      </div>

      <!-- Page content here -->
      <slot>
        <h1 class="text-lg/10">{{ LL.common.noPageContent() }}</h1>
      </slot>
    </section>

    <section class="drawer-side">
      <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
      <label for="my-nav-drawer" class="drawer-overlay" />

      <ul class="menu h-full w-80 bg-base-100 p-4">
        <!-- Sidebar content here -->
        <NavBarMenu @logout="logout" />
      </ul>
    </section>
  </nav>
</template>
