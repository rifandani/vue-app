<script setup lang="ts">
import { typesafeI18n } from '@i18n/i18n-vue'
import { useTodoListParams } from '@todo/composables/useTodoListParams.composable'
import { limits } from '@todo/constants/todos.constant'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

//#region VALUES
const router = useRouter()
const { LL } = typesafeI18n()
const { queryParams } = useTodoListParams()
const selectedOption = computed(() => queryParams.value.limit.toString())
//#endregion

//#region HANDLERS
const onChangeLimit = async (evt: Event) => {
  const target = evt.target as HTMLSelectElement
  await router.replace({ query: { limit: target.value } })
}
//#endregion
</script>

<template>
  <form
    aria-label="form-filter"
    class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2"
  >
    <label for="limit" class="label flex space-x-3">
      <span class="label-text">{{ LL.forms.limit() }}</span>

      <select
        id="limit"
        name="limit"
        aria-label="combobox-filter"
        class="select select-bordered select-primary"
        :value="selectedOption"
        @change="onChangeLimit"
      >
        <option v-for="limit in limits" :id="`filter-option-${limit}`" :key="limit" :value="limit">
          {{ limit }}
        </option>
      </select>
    </label>
  </form>
</template>
