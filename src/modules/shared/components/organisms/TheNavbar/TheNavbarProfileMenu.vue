<script setup lang="ts">
import { loginRoute } from '@auth/routes/auth.route'
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { LL } = typesafeI18n()
const user = useUserStorage()
const { replace } = useRouter()

const menuUser = ref<InstanceType<typeof Menu> | null>(null)
const menuItemsUser = ref<MenuItem[]>([
  {
    separator: true,
  },
  {
    label: LL.value.user.preferences(),
    items: [
      {
        label: LL.value.user.likedTodos(),
        icon: 'lucide:heart',
      },
      {
        label: LL.value.user.savedTodos(),
        icon: 'lucide:star',
      },
      {
        label: LL.value.user.yourComments(),
        icon: 'lucide:messages-square',
      },
    ],
  },
  {
    label: LL.value.common.settings(),
    items: [
      {
        label: LL.value.common.account(),
        icon: 'lucide:settings',
      },
      {
        label: LL.value.auth.logout(),
        icon: 'lucide:log-out',
        command: () => {
          user.value = null // reset `user` store & localStorage
          replace(loginRoute.path) // back to login
        },
      },
    ],
  },
])

function toggleUser(event: Event) {
  menuUser.value?.toggle(event)
}
</script>

<template>
  <Button
    aria-haspopup="true"
    aria-controls="menu-user"
    rounded
    text
    class="p-0"
    @click="toggleUser"
  >
    <Avatar
      :label="user?.username.slice(0, 2)"
      shape="circle"
      class="h-11 w-11 bg-surface-300 text-color"
    />
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
