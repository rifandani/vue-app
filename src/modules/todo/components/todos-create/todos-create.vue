<script setup lang="ts">
import { random } from '@rifandani/nxact-yutiriti'
import { useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { useTodoListParams } from '#todo/composables/use-todo-list-params'
import { useTodoCreate } from '#todo/composables/use-todo-create'
import { todoSchema } from '#todo/schemas/todo'
import { useUserStorage } from '#shared/composables/use-user-storage'
import { typesafeI18n } from '#i18n/i18n-vue'

// #region VALUES
const toast = useToast()
const { LL } = typesafeI18n()
const user = useUserStorage()
const queryClient = useQueryClient()
const { queryKey } = useTodoListParams()
const todoCreateMutation = useTodoCreate({ queryKey })

const { defineComponentBinds, handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: toTypedSchema(todoSchema),
  initialValues: {
    id: 1, // override it later on `onSubmit`
    userId: 1, // override it later on `onSubmit`
    todo: '',
    completed: false,
  },
})
const todo = defineComponentBinds('todo')
const onSubmit = handleSubmit((values, { resetForm }) => {
  const payload = {
    ...values,
    id: random(11, 999_999),
    userId: user.value?.id ?? 1,
  }

  todoCreateMutation.mutate(payload, {
    onSettled: (_newTodo, error, _variables, context) => {
      // reset form
      resetForm()

      toast.add({
        life: 3_000,
        severity: error ? 'error' : 'success',
        detail: error
          ? LL.value.error.action({ module: 'Todo', action: 'create' })
          : LL.value.success.action({ module: 'Todo', action: 'created' }),
      })

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error)
        queryClient.setQueryData(queryKey, context?.previousTodosQueryResponse)
    },
  })
})
// #endregion
</script>

<template>
  <form data-testid="form-create" class="mb-3 flex w-full flex-col duration-300 lg:flex-row" @submit="onSubmit">
    <InputText
      v-bind="todo" id="todo" name="todo" type="text" class="w-full lg:w-10/12" data-testid="input-create"
      :required="true" :placeholder="LL.forms.todoPlaceholder()" :class="{ 'p-invalid': !!errors.todo }"
    />

    <Button
      data-testid="button-create" class="ml-0 mt-2 w-full normal-case lg:ml-2 lg:mt-0 lg:w-2/12" type="submit"
      :label="LL.forms.add()" :disabled="isSubmitting"
    />
  </form>
</template>
