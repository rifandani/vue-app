<script setup lang="ts">
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import { useTheme } from '@shared/composables/useTheme/useTheme'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'

const { LL } = typesafeI18n()
const { mode, changeTheme } = useTheme()

const menuTheme = ref<InstanceType<typeof Menu> | null>(null)
const menuItemsTheme = ref<MenuItem[]>([
  {
    label: LL.value.common.theme(),
    items: [
      {
        icon: 'lucide:computer',
        label: LL.value.common.system(),
        showEndIcon: mode.value === 'auto',
        command: () => {
          changeTheme('auto')
        },
      },
      {
        icon: 'lucide:sun',
        label: LL.value.common.light(),
        showEndIcon: mode.value === 'light',
        command: () => {
          changeTheme('light')
        },
      },
      {
        icon: 'lucide:moon',
        label: LL.value.common.dark(),
        showEndIcon: mode.value === 'dark',
        command: () => {
          changeTheme('dark')
        },
      },
    ],
  },
])

function toggleTheme(event: Event) {
  menuTheme.value?.toggle(event)
}
</script>

<template>
  <Button
    aria-haspopup="true"
    aria-controls="menu-theme"
    :label="LL.common.theme()"
    @click="toggleTheme"
  >
    <template #icon>
      <Icon icon="lucide:computer" class="mr-2" />
    </template>
  </Button>

  <Menu id="menu-theme" ref="menuTheme" class="mt-2" :popup="true" :model="menuItemsTheme">
    <template #item="{ item, props }">
      <!-- IMPORTANT: wrapper needs to be an "a" tag for "command" to works -->
      <a v-ripple class="flex items-center" v-bind="props.action">
        <Icon class="mr-2" :icon="item.icon as string" />
        <span class="mr-auto">{{ item.label }}</span>
        <Icon v-if="item.showEndIcon" icon="lucide:check">{{ item.label }}</Icon>
      </a>
    </template>
  </Menu>
</template>
