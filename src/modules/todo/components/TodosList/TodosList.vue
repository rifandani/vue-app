<script setup lang="ts">
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import { ListSlideTransition } from '@shared/components/atoms'
import { useQuery } from '@tanstack/vue-query'
import { todoApi } from '@todo/api/todo.api'
import { useTodoListParams } from '@todo/composables/useTodoListParams.composable'
import TodosItem from '../TodosItem/TodosItem.vue'

//#region VALUES
const { LL } = typesafeI18n()
const { queryKey } = useTodoListParams()
const { isLoading, isError, error, isSuccess, data } = useQuery({
  queryKey,
  queryFn: ({ queryKey }) => todoApi.list(queryKey[2])
})
//#endregion
</script>

<template>
  <div v-if="isLoading" data-testid="list-loading" class="flex items-center justify-center py-5">
    <Icon icon="svg-spinners:3-dots-fade" height="5em" class="text-primary-content" />
  </div>

  <div v-if="isError" data-testid="list-error" class="alert alert-error mt-2 shadow-lg">
    <div class="flex items-center">
      <span>{{ LL.common.error({ module: 'Todos' }) }}:</span>
      <pre>{{ JSON.stringify(error, null, 2) }}</pre>
    </div>
  </div>

  <template v-if="isSuccess && data">
    <p
      v-if="!data.todos.length"
      data-testid="list-empty"
      class="flex items-center justify-center py-5"
    >
      {{ LL.common.empty() }}
    </p>

    <ListSlideTransition v-else>
      <TodosItem v-for="todo in data.todos" :key="todo.id" :todo="todo" />
    </ListSlideTransition>
  </template>
</template>
