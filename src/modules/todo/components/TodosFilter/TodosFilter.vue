<script setup lang="ts">
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { limits } from '../../constants/todos.constant'

//#region VALUES
const { LL } = typesafeI18n()
// const { searchParams, queryParams } = createTodoListReadable();
// $: selectedOption = $queryParams.limit.toString();
//#endregion

//#region HANDLERS
// const onChangeLimit: HTMLSelectAttributes['on:change'] = async ({ currentTarget }) => {
//   // set to url params
//   $searchParams.set('limit', currentTarget.value);
//   await push(`/todos?${$searchParams.toString()}`);
// };
//#endregion
</script>

<template>
  <form data-testid="form" class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2">
    <label data-testid="label-limit" for="limit" class="label">
      <span class="label-text text-primary-content">{{ LL.forms.limit() }}</span>
    </label>

    <!-- on:change={onChangeLimit} -->
    <!-- value={selectedOption} -->
    <select
      id="limit"
      data-testid="select-limit"
      class="select-bordered select-secondary select"
      name="limit"
    >
      <!-- :selected="limit === selectedOption" -->
      <option
        v-for="limit in limits"
        :key="limit"
        :data-testid="`option-limit-${limit}`"
        :value="limit"
      >
        {{ limit }}
      </option>
    </select>
  </form>
</template>
