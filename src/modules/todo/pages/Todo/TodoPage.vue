<script setup lang="ts">
import { useToast } from '@ark-ui/vue'
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import type { ErrorApiResponseSchema } from '@shared/api/error.schema'
import { NavBar } from '@shared/components/organisms'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { todoApi, todoKeys } from '@todo/api/todo.api'
import {
  updateTodoSchema,
  type UpdateTodoApiResponseSchema,
  type UpdateTodoSchema
} from '@todo/api/todo.schema'
import { useTodoDetailParams } from '@todo/composables/useTodoDetailParams.composable'
import { todosRoute } from '@todo/routes/todo.route'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

//#region VALUES
const route = useRoute()
const { push } = useRouter()
const queryClient = useQueryClient()
const user = useUserStorage()
const toast = useToast()
const { LL } = typesafeI18n()
const id = computed(() => {
  // initial load, `route.params === undefined`
  // -1 to make query options `enabled: false`
  if (!route.params) return -1

  return Number(route.params.id)
})
const { enabled, queryKey } = useTodoDetailParams({ id })

const { isLoading, isError, isSuccess, error, data } = useQuery({
  enabled,
  queryKey,
  queryFn: ({ queryKey }) => todoApi.detail(queryKey[2])
})
const {
  isError: mutationIsError,
  error: mutationError,
  mutate
} = useMutation<UpdateTodoApiResponseSchema, ErrorApiResponseSchema, UpdateTodoSchema>({
  mutationFn: (updateTodo) => todoApi.update(updateTodo),
  onSuccess: async (updatedTodo) => {
    // NOTE: the order of function call MATTERS
    await push(todosRoute.path)
    queryClient.removeQueries({ queryKey: todoKeys.detail(updatedTodo.id) }) // delete the query cache
    await queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
  },
  onSettled: (_updateTodo, error) => {
    toast.value.create({
      type: error ? 'error' : 'success',
      title: error
        ? LL.value.common.xUpdateError({ feature: 'Todo' })
        : LL.value.common.xUpdateSuccess({ feature: 'Todo' })
    })
  }
})

const initialValues = computed<UpdateTodoSchema>(() => ({
  todo: data.value?.todo ?? LL.value.common.loading(),
  id: data.value?.id ?? 1,
  completed: data.value?.completed ?? false
}))
const { defineInputBinds, handleSubmit, isSubmitting } = useForm({
  initialValues,
  validationSchema: toTypedSchema(updateTodoSchema)
})
const todo = defineInputBinds('todo', { validateOnInput: true })
const onSubmit = handleSubmit((values) => {
  const payload = {
    ...initialValues.value,
    todo: values.todo
  }

  mutate(payload)
})
//#endregion
</script>

<template>
  <NavBar>
    <section class="flex flex-col justify-center px-10 py-20 md:px-24 lg:px-40 xl:px-52">
      <div class="mb-10 flex w-full flex-col space-y-2">
        <RouterLink
          role="link"
          aria-label="go-back"
          class="link w-fit normal-case hover:skew-x-12"
          :to="todosRoute.path"
        >
          ⬅ {{ LL.todo.backTo({ target: 'Todos' }) }}
        </RouterLink>

        <h1 class="text-2xl font-semibold tracking-wider">
          {{ LL.common.xDetail({ feature: 'Todo' }) }}
        </h1>
      </div>

      <div
        v-if="mutationIsError && mutationError"
        data-testid="todo-mutationError"
        class="alert alert-error mt-2 shadow-lg"
      >
        <div class="flex items-center">
          <span> {{ LL.common.error({ module: 'Todo Mutation' }) }}:{{ ' ' }} </span>
          <pre>{{ JSON.stringify(mutationError, null, 2) }}</pre>
        </div>
      </div>

      <div
        v-if="isLoading"
        data-testid="todo-loading"
        class="flex items-center justify-center py-5"
      >
        <Icon icon="svg-spinners:3-dots-fade" height="5em" class="text-secondary-content" />
      </div>

      <div v-if="isError" data-testid="todo-error" class="alert alert-error mt-2 shadow-lg">
        <div class="flex items-center">
          <span>{{ LL.common.error({ module: 'Todos' }) }}:</span>
          <pre>{{ JSON.stringify(error, null, 2) }}</pre>
        </div>
      </div>

      <form v-if="isSuccess && data" aria-label="form-todo" class="join" @submit="onSubmit">
        <input
          id="todo"
          name="todo"
          type="text"
          aria-label="textbox-todo"
          class="input join-item input-bordered input-primary w-full"
          required
          v-bind="todo"
        />

        <button
          v-if="user?.id === data.userId"
          aria-label="button-submit"
          class="btn btn-primary join-item normal-case disabled:btn-disabled"
          type="submit"
          :disabled="isSubmitting"
        >
          {{ LL.common.update({ icon: '🖋' }) }}
        </button>
      </form>
    </section>
  </NavBar>
</template>
