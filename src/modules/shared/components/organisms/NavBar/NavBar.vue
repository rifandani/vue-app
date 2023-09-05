<script setup lang="ts">
import { loginRoute } from '@auth/routes/auth.route'
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import { SvgIcon } from '@shared/components/atoms'
import { NavbarMenuContent } from '@shared/components/molecules'
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
  <nav class="drawer min-h-screen text-primary-content">
    <input id="my-nav-drawer" type="checkbox" aria-label="drawer" class="drawer-toggle" />

    <section class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar w-full bg-base-300">
        <div class="flex-none lg:hidden">
          <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
          <label for="my-nav-drawer" class="btn btn-square btn-primary">
            <Icon icon="lucide:menu" height="2em" class="text-primary-content" />
          </label>
        </div>

        <RouterLink
          :to="{ name: 'home' }"
          class="link-primary link mx-2 flex-1 px-2"
          role="link"
          aria-label="logo"
        >
          <span class="flex items-center space-x-2 pl-2 text-2xl">
            <SvgIcon id="icon-vue" class="h-6 w-6" />
            <p class="font-semibold tracking-wider text-primary">{{ LL.common.appName() }}</p>
          </span>
        </RouterLink>

        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <NavbarMenuContent @logout="logout" />
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

      <ul class="menu h-full w-80 bg-base-200 p-4">
        <!-- Sidebar content here -->
        <NavbarMenuContent @logout="logout" />
      </ul>
    </section>
  </nav>
</template>
