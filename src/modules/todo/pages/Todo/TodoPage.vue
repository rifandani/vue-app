<script setup lang="ts">
import { useToast } from '@ark-ui/vue'
import { Icon } from '@iconify/vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { z } from 'zod'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '../../../shared/api/error.schema'
import { NavBar } from '../../../shared/components/organisms'
import { useUserStorage } from '../../../shared/composables/useUserStorage/useUserStorage.composable'
import { todoApi, todoKeys } from '../../api/todo.api'
import {
  todoSchema,
  type UpdateTodoApiResponseSchema,
  type UpdateTodoSchema
} from '../../api/todo.schema'
import { useTodoDetailParams } from '../../composables/useTodoDetailParams.composable'

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

  // will throw error if `params.id` is not a number
  const id = z.coerce.number().parse(route.params.id)
  return Number(id)
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
    await push('/todos')
    queryClient.removeQueries({ queryKey: computed(() => todoKeys.detail(updatedTodo.id)) }) // delete the query cache
    await queryClient.invalidateQueries({ queryKey: computed(() => todoKeys.lists()) })
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

const initialValues = computed(() => ({
  todo: data.value?.todo ?? LL.value.common.loading(),
  id: data.value?.id ?? 1,
  completed: data.value?.completed ?? false,
  userId: data.value?.userId ?? 1
}))
const { defineInputBinds, handleSubmit, isSubmitting } = useForm({
  initialValues,
  validationSchema: toTypedSchema(todoSchema)
})
const todo = defineInputBinds('todo', { validateOnInput: true })
const onSubmit = handleSubmit((values) => {
  const payload = {
    todo: values.todo,
    id: data.value?.id ?? values.id,
    completed: data.value?.completed ?? values.completed
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
          class="btn-link w-fit normal-case text-primary-content"
          :to="{ name: 'todos' }"
        >
          ⬅ {{ LL.todo.backTo({ target: 'Todos' }) }}
        </RouterLink>

        <h1 class="text-2xl font-semibold tracking-wider text-primary-content">
          {{ LL.common.xDetail({ feature: 'Todo' }) }}
        </h1>
      </div>

      <div
        v-if="mutationIsError && mutationError"
        data-testid="todo-mutationError"
        class="alert alert-error mt-2 shadow-lg"
      >
        <div class="flex items-center">
          <span>
            {{ LL.common.error({ module: 'Todo Mutation' }) }}:{{ ' ' }}
            {{ mutationError.message }}
          </span>
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
          class="input join-item input-bordered input-accent w-full text-accent-content"
          required
          v-bind="todo"
        />

        <button
          v-if="user?.id === data.userId"
          aria-label="button-submit"
          class="btn btn-accent join-item normal-case disabled:btn-disabled"
          type="submit"
          :disabled="isSubmitting"
        >
          {{ LL.common.update({ icon: '🖋' }) }}
        </button>
      </form>
    </section>
  </NavBar>
</template>
