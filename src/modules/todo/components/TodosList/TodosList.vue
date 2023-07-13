<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { typesafeI18n } from '../../../../i18n/i18n-vue'

//#region VALUES
const { LL } = typesafeI18n()
// const { queryOptions } = createTodoListQuery()
// $: todosQuery = createQuery($queryOptions)
//#endregion
</script>

<template>
  <!-- {#if $todosQuery.isLoading} -->
  <div class="flex items-center justify-center py-5">
    <Icon icon="svg-spinners:3-dots-fade" height="5em" class="text-secondary-content" />
  </div>

  <!-- {#if $todosQuery.isError} -->
  <div class="alert alert-error mt-2 shadow-lg">
    <div class="flex items-center">
      <span>{{ LL.common.error({ module: 'Todos' }) }}:</span>
      <pre>{JSON.stringify($todosQuery.error, null, 2)}</pre>
    </div>
  </div>

  <!-- {#if $todosQuery.isSuccess}
  {#each $todosQuery.data.todos as todo (todo.id)}
  <TodosItem {todo} />
  {:else}
  <p class="flex items-center justify-center py-5">{$LL.common.empty()}</p>
  {/each}
  {/if} -->
</template>
