<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '@vueuse/core'
import { RouterLink, useRouter } from 'vue-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '#shared/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '#shared/components/ui/sheet'
import { Button } from '#shared/components/ui/button'
import { Avatar, AvatarFallback } from '#shared/components/ui/avatar'
import SvgIcon from '#shared/components/svg-icon.vue'
import { useUserStorage } from '#shared/composables/use-user-storage'
import { loginRoute } from '#auth/routes'
import { playgroundRoute } from '#playground/routes'
import { homeRoute } from '#home/routes'
import { todosRoute } from '#todo/routes'

const user = useUserStorage()
const { t, locale } = useI18n()
const { replace } = useRouter()
const { store } = useColorMode()

function logout() {
  user.value = null // reset `user` store
  replace(loginRoute.path) // back to login
}
</script>

<template>
  <nav class="flex items-center justify-between border-b p-2.5 shadow-sm">
    <RouterLink :to="homeRoute.path" class="flex items-center">
      <SvgIcon id="icon-vue" class="size-6" />
      <span class="ml-2 text-2xl font-semibold">
        {{ t("common.appName") }}
      </span>
    </RouterLink>

    <section class="hidden items-center gap-x-2 sm:flex">
      <!-- languages -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="icon" variant="outline">
            <Icon :icon="locale === 'en-US' ? 'flag:us-1x1' : 'flag:id-1x1'" class="size-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuRadioGroup v-model="locale">
            <DropdownMenuRadioItem value="en-US" @select="locale = 'en-US'">
              English
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="id-ID" @select="locale = 'id-ID'">
              Indonesia
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- themes -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="icon" variant="outline">
            <Icon
              :icon="store === 'auto' ? 'lucide:computer' : store === 'light' ? 'lucide:sun' : 'lucide:moon'"
              class="size-6"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuRadioGroup v-model="store">
            <DropdownMenuRadioItem value="auto" @select="store = 'auto'">
              {{ t('common.system') }}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light" @select="store = 'light'">
              {{ t('common.light') }}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" @select="store = 'dark'">
              {{ t('common.dark') }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- profile -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Avatar>
            <AvatarFallback>{{ user?.username.slice(0, 2).toUpperCase() }}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>{{ t('common.account') }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem class="gap-x-2">
              <Icon icon="lucide:user" />
              <p>{{ t("common.profile") }}</p>
            </DropdownMenuItem>
            <DropdownMenuItem class="gap-x-2">
              <Icon icon="lucide:settings" />
              <p>{{ t("common.settings") }}</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-x-2" @click="logout">
            <Icon icon="lucide:log-out" />
            <p>{{ t("auth.logout") }}</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>

    <!-- sidebar on mobile -->
    <Sheet>
      <SheetTrigger class="sm:hidden">
        <Icon icon="lucide:menu" class="size-6" />
      </SheetTrigger>

      <SheetContent side="left" class="flex w-[400px] flex-col justify-between">
        <SheetHeader class="text-left">
          <SvgIcon id="icon-vue" class="mb-6 size-6" />

          <RouterLink :to="homeRoute.path">
            Home
          </RouterLink>
          <RouterLink :to="todosRoute.path">
            Todos
          </RouterLink>
          <RouterLink :to="playgroundRoute.path">
            Playground
          </RouterLink>
        </SheetHeader>

        <SheetFooter>
          <Button
            class="gap-x-2" @click="logout"
          >
            <Icon icon="lucide:log-out" />
            {{ t('auth.logout') }} ({{ user?.username ?? 'Unknown' }})
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </nav>
</template>
