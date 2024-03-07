<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStorage } from '#shared/composables/use-user-storage'
import { loginRoute } from '#auth/routes'

const { t } = useI18n()
const user = useUserStorage()
const { replace } = useRouter()
const menuUser = ref<InstanceType<typeof Menu> | null>(null)
const menuItemsUser = ref<MenuItem[]>([
  {
    separator: true,
  },
  {
    label: t('user.preferences'),
    items: [
      {
        label: t('user.likedTodos'),
        icon: 'lucide:heart',
      },
      {
        label: t('user.savedTodos'),
        icon: 'lucide:star',
      },
      {
        label: t('user.yourComments'),
        icon: 'lucide:messages-square',
      },
    ],
  },
  {
    label: t('common.settings'),
    items: [
      {
        label: t('common.account'),
        icon: 'lucide:settings',
      },
      {
        label: t('auth.logout'),
        icon: 'lucide:log-out',
        command: () => {
          user.value = null // reset `user` store & localStorage
          replace(loginRoute.path) // back to login
        },
      },
    ],
  },
])
</script>

<template>
  <Button
    aria-haspopup="true" aria-controls="menu-user" rounded text class="p-0" @click="(evt) => {
      menuUser?.toggle(evt)
    }"
  >
    <Avatar :label="user?.username.slice(0, 2)" shape="circle" class="size-11 bg-surface-300 text-color" />
  </Button>

  <Menu id="menu-user" ref="menuUser" class="mt-2" :popup="true" :model="menuItemsUser">
    <template #start>
      <Button
        text
        class="relative flex w-full items-center overflow-hidden rounded-none p-2 pl-3 text-color hover:bg-surface-200"
      >
        <Avatar :label="user?.username.slice(0, 2)" class="mr-2 bg-surface-300" shape="circle" />
        <span class="inline-flex flex-col text-left">
          <span class="truncate font-bold">{{ user?.username }}</span>
          <span class="truncate text-sm">{{ user?.email }}</span>
        </span>
      </Button>
    </template>

    <template #item="{ item, props }">
      <!-- IMPORTANT: wrapper needs to be an "a" tag for "command" to works -->
      <a v-ripple class="flex items-center" v-bind="props.action">
        <Icon :icon="item.icon as string" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>
