<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import InlineMessage from 'primevue/inlinemessage'
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { todosRoute } from '#todo/routes'
import { useTodoDetailParams } from '#todo/composables/use-todo-detail-params'
import {
  type UpdateTodoApiResponseSchema,
  type UpdateTodoSchema,
  todoApi,
  todoKeys,
  updateTodoSchema,
} from '#todo/apis/todo'
import { useUserStorage } from '#shared/composables/use-user-storage'
import NavBar from '#shared/components/nav-bar/nav-bar.vue'
import type { ErrorApiResponseSchema } from '#shared/schemas/error'
import { typesafeI18n } from '#i18n/i18n-vue'

// #region VALUES
const route = useRoute()
const { push } = useRouter()
const queryClient = useQueryClient()
const user = useUserStorage()
const toast = useToast()
const { LL } = typesafeI18n()
const id = computed(() => {
  // initial load, `route.params === undefined`
  // -1 to make query options `enabled: false`
  if (!route.params)
    return -1

  return Number(route.params.id)
})
const { enabled, queryKey } = useTodoDetailParams({ id })

const { isLoading, isSuccess, error, data } = useQuery({
  enabled,
  queryKey,
  queryFn: () => todoApi.detail(queryKey.value[2]),
})
const { error: mutationError, mutate } = useMutation<
  UpdateTodoApiResponseSchema,
  ErrorApiResponseSchema,
  UpdateTodoSchema
>({
  mutationFn: updateTodo => todoApi.update(updateTodo),
  onSuccess: async (updatedTodo) => {
    // NOTE: the order of function call MATTERS
    await push(todosRoute.path)
    queryClient.removeQueries({ queryKey: todoKeys.detail(updatedTodo.id) }) // delete the query cache
    await queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
  },
  onSettled: (_updateTodo, error) => {
    toast.add({
      life: 3_000,
      severity: error ? 'error' : 'success',
      detail: error
        ? LL.value.common.xUpdateError({ feature: 'Todo' })
        : LL.value.common.xUpdateSuccess({ feature: 'Todo' }),
    })
  },
})

const initialValues = computed<UpdateTodoSchema>(() => ({
  todo: data.value?.todo ?? LL.value.common.loading(),
  id: data.value?.id ?? 1,
  completed: data.value?.completed ?? false,
}))
const { defineField, handleSubmit, isSubmitting } = useForm<UpdateTodoSchema>({
  initialValues: initialValues.value,
  validationSchema: toTypedSchema(updateTodoSchema),
})
const [todo, todoAttrs] = defineField('todo', { validateOnInput: true })
const onSubmit = handleSubmit((values) => {
  const payload = {
    ...initialValues.value,
    todo: values.todo,
  }

  mutate(payload)
})
// #endregion
</script>

<template>
  <NavBar />

  <main class="container mx-auto flex flex-col items-center py-5 duration-300">
    <div class="mb-10 flex w-full flex-col space-y-2">
      <RouterLink
        role="link" aria-label="go-back"
        class="w-fit normal-case text-color-primary no-underline hover:text-green-700" :to="todosRoute.path"
      >
        ⬅ {{ LL.todo.backTo({ target: 'Todos' }) }}
      </RouterLink>

      <h1 class="text-3xl font-medium sm:text-4xl">
        {{ LL.common.xDetail({ feature: 'Todo' }) }}
      </h1>
    </div>

    <div v-if="!!mutationError" data-testid="todo-mutationError" class="flex flex-col items-center">
      <InlineMessage severity="error">
        {{
          LL.common.error({ module: 'Todo Mutation' })
        }}
      </InlineMessage>
      <pre class="text-red-500">{{ JSON.stringify(mutationError, null, 2) }}</pre>
    </div>

    <div v-if="isLoading" data-testid="todo-loading" class="flex items-center justify-center py-5">
      <Icon icon="svg-spinners:3-dots-fade" height="5em" class="text-color-primary" />
    </div>

    <div v-if="error" data-testid="todo-error" class="flex flex-col items-center">
      <InlineMessage severity="error">
        {{ LL.common.error({ module: 'Todo Detail' }) }}:
      </InlineMessage>
      <pre class="text-red-500">{{
        JSON.stringify(
          error instanceof z.ZodError ? fromZodError(error).message : error.message,
          null,
          2,
        )
      }}</pre>
    </div>

    <form v-if="isSuccess && data" aria-label="form-todo" class="w-full" @submit="onSubmit">
      <InputGroup>
        <InputText
          id="todo" v-model="todo" v-bind="todoAttrs" name="todo" type="text" aria-label="textbox-todo"
          class="w-full lg:w-10/12" :required="true"
        />

        <Button
          v-if="user?.id === data.userId" aria-label="button-submit" class="min-w-fit normal-case" type="submit"
          :disabled="isSubmitting"
        >
          {{ LL.forms.update() }}
        </Button>
      </InputGroup>
    </form>
  </main>
</template>
