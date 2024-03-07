<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { todosRoute } from '#todo/routes'
import SvgIcon from '#shared/components/svg-icon.vue'
import { playgroundRoute } from '#playground/routes'
import { homeRoute } from '#home/routes'

const props = defineProps<{
  visible: boolean
}>()
const emit = defineEmits<{
  logout: []
  'update:visible': [value: boolean]
}>()

const { t } = useI18n()

/**
 * "visible" is read-only, to make it works with v-model we need a setter
 *
 * or we can use "useVModel" from "@vueuse/core"
 * or we can use "defineModel" starting from "vue@3.3" -> this way we don't need the "visible" props and "update:visible" emits
 */
const visibleModel = computed({
  get() {
    return props.visible
  },
  set(value) {
    // IMPORTANT: 'update:' as prefix is required for v-model to work correctly
    emit('update:visible', value)
  },
})
</script>

<template>
  <Sidebar v-model:visible="visibleModel">
    <template #container="{ closeCallback }">
      <div class="flex h-full flex-col">
        <div class="flex shrink-0 items-center justify-between p-4">
          <span class="inline-flex items-center gap-2">
            <SvgIcon id="icon-vue" class="size-6" />
            <span class="text-2xl font-semibold text-color-primary">{{ t("common.appName") }}</span>
          </span>

          <Button text rounded class="p-2" @click="closeCallback">
            <template #default>
              <Icon icon="lucide:x" height="1em" />
            </template>
          </Button>
        </div>

        <ul class="flex list-none flex-col p-4 py-0">
          <RouterLink
            class="w-full cursor-pointer rounded-md px-4 py-3 text-color no-underline hover:bg-surface-100"
            :to="homeRoute.path"
          >
            Home
          </RouterLink>
          <RouterLink
            class="w-full cursor-pointer rounded-md px-4 py-3 text-color no-underline hover:bg-surface-100"
            :to="todosRoute.path"
          >
            Todos
          </RouterLink>
          <RouterLink
            class="w-full cursor-pointer rounded-md px-4 py-3 text-color no-underline hover:bg-surface-100"
            :to="playgroundRoute.path"
          >
            Playground
          </RouterLink>
        </ul>

        <div class="mt-auto p-4">
          <Button rounded outlined class="w-full" severity="danger" :label="t('auth.logout')" @click="emit('logout')">
            <template #icon>
              <Icon icon="lucide:log-out" />
            </template>
          </Button>
        </div>
      </div>
    </template>
  </Sidebar>
</template>
