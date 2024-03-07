<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const mode = useColorMode()
const menuTheme = ref<InstanceType<typeof Menu> | null>(null)
const menuItemsTheme = ref<MenuItem[]>([
  {
    label: t('common.theme'),
    items: [
      {
        icon: 'lucide:computer',
        label: t('common.system'),
        showEndIcon: mode.store.value === 'auto', // FIXME: this is not reactive
        command: () => {
          mode.value = 'auto'
        },
      },
      {
        icon: 'lucide:sun',
        label: t('common.light'),
        showEndIcon: mode.store.value === 'light',
        command: () => {
          mode.value = 'light'
        },
      },
      {
        icon: 'lucide:moon',
        label: t('common.dark'),
        showEndIcon: mode.store.value === 'dark',
        command: () => {
          mode.value = 'dark'
        },
      },
    ],
  },
])
</script>

<template>
  <Button
    aria-haspopup="true" aria-controls="menu-theme" @click="(evt) => {
      menuTheme?.toggle(evt)
    }"
  >
    <template #icon>
      <Icon icon="lucide:computer" />
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
