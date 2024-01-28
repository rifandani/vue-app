<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { typesafeI18n } from '#i18n/i18n-vue'
import { loadLocale } from '#i18n/i18n-util.sync'

const { LL, locale, setLocale } = typesafeI18n()
const menuTheme = ref<InstanceType<typeof Menu> | null>(null)
const menuItemsTheme = ref<MenuItem[]>([
  {
    label: LL.value.common.language(),
    items: [
      {
        icon: 'flag:us-1x1',
        label: LL.value.common.english(),
        showEndIcon: locale.value === 'en', // FIXME: this is not reactive
        command: () => {
          // update dictionaries and update formatters
          loadLocale('en')
          // change locale store
          setLocale('en')
        },
      },
      {
        icon: 'flag:id-1x1',
        label: 'Indonesia',
        showEndIcon: locale.value === 'id',
        command: () => {
          // update dictionaries and update formatters
          loadLocale('id')
          // change locale store
          setLocale('id')
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
      <Icon icon="lucide:globe" />
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
