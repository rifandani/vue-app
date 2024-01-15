<script setup lang="ts">
import { typesafeI18n } from '@i18n/i18n-vue'
import { useTodoListParams } from '@todo/composables/useTodoListParams.composable'
import { limits } from '@todo/constants/todos.constant'
import type { DropdownChangeEvent } from 'primevue/dropdown'
import Dropdown from 'primevue/dropdown'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// #region VALUES
const router = useRouter()
const { LL } = typesafeI18n()
const { queryParams } = useTodoListParams()
const selectedOption = computed(() => queryParams.value.limit.toString())
// #endregion

// #region HANDLERS
async function onChangeLimit({ value }: DropdownChangeEvent) {
  await router.replace({ query: { limit: value } })
}
// #endregion
</script>

<template>
  <form
    aria-label="form-filter"
    class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2"
  >
    <label for="limit" class="flex items-center space-x-3">
      <p class="text-base font-normal">{{ LL.forms.limit() }}</p>
      <Dropdown
        id="limit"
        name="limit"
        aria-label="combobox-filter"
        :model-value="selectedOption"
        :options="limits"
        @change="onChangeLimit"
      />
    </label>
  </form>
</template>
