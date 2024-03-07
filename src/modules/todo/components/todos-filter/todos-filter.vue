<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { limits } from '#todo/constants/todos'
import { useTodoListParams } from '#todo/composables/use-todo-list-params'

// #region VALUES
const { t } = useI18n()
const router = useRouter()
const { queryParams } = useTodoListParams()
const selectedOption = computed(() => queryParams.value.limit.toString())
// #endregion
</script>

<template>
  <form aria-label="form-filter" class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2">
    <label for="limit" class="flex items-center space-x-3">
      <p class="text-base font-normal">{{ t('common.limit') }}</p>
      <Dropdown
        id="limit" name="limit" aria-label="combobox-filter" :model-value="selectedOption" :options="limits"
        @change="async (evt) => {
          await router.replace({ query: { limit: evt.value } })
        }"
      />
    </label>
  </form>
</template>
