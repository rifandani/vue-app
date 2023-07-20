<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { useTodoListParams } from '../../composables/useTodoListParams.composable'
import { limits } from '../../constants/todos.constant'

//#region VALUES
const router = useRouter()
const { LL } = typesafeI18n()
const { queryParams } = useTodoListParams()
const selectedOption = computed(() => queryParams.value.limit.toString())
//#endregion

//#region HANDLERS
const onChangeLimit = async (evt: Event) => {
  const target = evt.target as HTMLInputElement
  await router.replace({ query: { limit: target.value } })
}
//#endregion
</script>

<template>
  <form
    data-testid="filter-form"
    class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2"
  >
    <label data-testid="filter-label" for="limit" class="label">
      <span class="label-text text-primary-content">{{ LL.forms.limit() }}</span>
    </label>

    <select
      id="limit"
      name="limit"
      data-testid="filter-limit"
      class="select-bordered select-secondary select"
      :value="selectedOption"
      @change="onChangeLimit"
    >
      <option
        v-for="limit in limits"
        :id="`filter-option-${limit}`"
        :key="limit"
        :value="limit"
        :selected="limit === selectedOption"
      >
        {{ limit }}
      </option>
    </select>
  </form>
</template>
