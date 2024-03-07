<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useQuery } from '@tanstack/vue-query'
import InlineMessage from 'primevue/inlinemessage'
import { useI18n } from 'vue-i18n'
import TodosItem from '#todo/components/todos-item/todos-item.vue'
import { todoApi } from '#todo/apis/todo'
import { useTodoListParams } from '#todo/composables/use-todo-list-params'
import ListSlideTransition from '#shared/components/list-slide-transition.vue'

// #region VALUES
const { t } = useI18n()
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
        {{ t("common.xError", { feature: 'Todos' }) }}
      </InlineMessage>
      <pre class="text-red-500">{{ JSON.stringify(error, null, 2) }}</pre>
    </div>
  </div>

  <template v-if="isSuccess && data">
    <p v-if="!data.todos.length" data-testid="list-empty" class="flex items-center justify-center py-5">
      {{ t("common.empty") }}
    </p>

    <ListSlideTransition v-else>
      <TodosItem v-for="todo in data.todos" :key="todo.id" :todo="todo" />
    </ListSlideTransition>
  </template>
</template>
