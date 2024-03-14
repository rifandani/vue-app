<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
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
import NavBar from '#shared/components/nav-bar.vue'
import type { ErrorApiResponseSchema } from '#shared/schemas/error'
import { Input } from '#shared/components/ui/input'
import { Button } from '#shared/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '#shared/components/ui/breadcrumb'
import { homeRoute } from '#home/routes'

// #region VALUES
const route = useRoute()
const { push } = useRouter()
const queryClient = useQueryClient()
const user = useUserStorage()
const { t } = useI18n()
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
    toast(
      error
        ? t('common.xUpdateError', { feature: 'Todo' })
        : t('common.xUpdateSuccess', { feature: 'Todo' }),
      {
        closeButton: true,
      },
    )
  },
})

const initialValues: UpdateTodoSchema = {
  id: 1,
  completed: false,
  todo: t('common.loading'),
}
const { defineField, handleSubmit, isSubmitting, resetForm } = useForm<UpdateTodoSchema>({
  initialValues,
  validationSchema: toTypedSchema(updateTodoSchema),
})
const [todo, todoAttrs] = defineField('todo', { validateOnInput: true })
// #endregion

// #region HANDLERS
const onSubmit = handleSubmit((_values) => {
  const payload = {
    ...initialValues,
    todo: _values.todo,
  }

  mutate(payload)
})
// #endregion HANDLERS

// sync async data response to form values
watch([data], () => {
  if (data.value) {
    resetForm({
      values: {
        id: data.value.id,
        completed: data.value.completed,
        todo: data.value.todo,
      },
    })
  }
})
</script>

<template>
  <NavBar />

  <main class="container mx-auto flex flex-col items-center py-5 duration-300">
    <div class="mb-10 flex w-full flex-col space-y-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as-child>
              <RouterLink :to="homeRoute.path">
                Home
              </RouterLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as-child>
              <RouterLink :to="todosRoute.path">
                Todos
              </RouterLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ id }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 class="text-3xl font-medium sm:text-4xl">
        {{ t("common.xDetail", { feature: 'Todo' }) }}
      </h1>
    </div>

    <div v-if="!!mutationError" data-testid="todo-mutationError" class="flex flex-col items-center">
      <p class="text-destructive">
        {{ t("common.xError", { feature: 'Todo mutation' }) }}
      </p>
      <pre>{{ JSON.stringify(mutationError, null, 2) }}</pre>
    </div>

    <div v-if="isLoading" data-testid="todo-loading" class="flex items-center justify-center py-5">
      <Icon icon="svg-spinners:3-dots-fade" height="5em" />
    </div>

    <div v-if="error" data-testid="todo-error" class="flex flex-col items-center">
      <p class="text-destructive">
        {{ t("common.xError", { feature: 'Todo detail' }) }}:
      </p>
      <pre>{{
        JSON.stringify(
          error instanceof z.ZodError ? fromZodError(error).message : error.message,
          null,
          2,
        )
      }}</pre>
    </div>

    <form v-if="isSuccess && data" aria-label="form-todo" class="flex w-full gap-x-2" @submit="onSubmit">
      <Input
        id="todo" v-bind="todoAttrs" v-model="todo" name="todo" type="text" aria-label="textbox-todo"
        class="w-8/12 sm:w-9/12 lg:w-10/12" :required="true"
      />

      <Button
        v-if="user?.id === data.userId" aria-label="button-submit" class="w-4/12 sm:w-3/12 lg:w-2/12" type="submit"
        :disabled="isSubmitting"
      >
        {{ t("common.update") }}
      </Button>
    </form>
  </main>
</template>
