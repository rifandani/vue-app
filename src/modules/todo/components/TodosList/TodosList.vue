<script setup lang="ts">
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import { ListSlideTransition } from '@shared/components/atoms'
import { useQuery } from '@tanstack/vue-query'
import { todoApi } from '@todo/api/todo.api'
import { useTodoListParams } from '@todo/composables/useTodoListParams.composable'
import InlineMessage from 'primevue/inlinemessage'
import TodosItem from '../TodosItem/TodosItem.vue'

// #region VALUES
const { LL } = typesafeI18n()
const { queryKey } = useTodoListParams()
const { isLoading, isError, error, isSuccess, data } = useQuery({
  queryKey,
  queryFn: () => todoApi.list(queryKey.value[2]),
})
// #endregion
</script>

<template>
  <div v-if="isLoading" data-testid="list-loading" class="flex items-center justify-center py-5">
    <Icon icon="svg-spinners:3-dots-fade" height="5em" class="text-color-primary" />
  </div>

  <div v-if="isError" data-testid="list-error" class="mt-2">
    <div class="flex flex-col items-center">
      <InlineMessage severity="error">
        {{ LL.common.error({ module: 'Todos' }) }}
      </InlineMessage>
      <pre class="text-red-500">{{ JSON.stringify(error, null, 2) }}</pre>
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
