<script setup lang="ts">
import { random } from '@rifandani/nxact-yutiriti'
import { useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { useTodoListParams } from '#todo/composables/use-todo-list-params'
import { useTodoCreate } from '#todo/composables/use-todo-create'
import { todoSchema } from '#todo/apis/todo'
import { useUserStorage } from '#shared/composables/use-user-storage'
import { Button } from '#shared/components/ui/button'
import { Input } from '#shared/components/ui/input'

// #region VALUES
const { t } = useI18n()
const user = useUserStorage()
const queryClient = useQueryClient()
const { queryKey } = useTodoListParams()
const todoCreateMutation = useTodoCreate({ queryKey })

const { defineField, handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: toTypedSchema(todoSchema),
  initialValues: {
    id: 1, // override it later on `onSubmit`
    userId: 1, // override it later on `onSubmit`
    todo: '',
    completed: false,
  },
})
const [todo, todoAttrs] = defineField('todo')
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

      toast(
        error
          ? t('common.xCreateError', { feature: 'Todo' })
          : t('common.xCreateSuccess', { feature: 'Todo' }),
        {
          closeButton: true,
        },
      )

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error)
        queryClient.setQueryData(queryKey.value, context?.previousTodosQueryResponse)
    },
  })
})
// #endregion
</script>

<template>
  <form data-testid="form-create" class="mb-3 flex w-full flex-col duration-300 lg:flex-row" @submit="onSubmit">
    <Input
      v-bind="todoAttrs" id="todo" v-model="todo" name="todo" type="text" class="w-full lg:w-10/12" data-testid="input-create"
      :required="true" :placeholder="t('todo.todoPlaceholder')" :variant="!!errors.todo ? 'error' : 'default'"
    />

    <Button
      data-testid="button-create" class="ml-0 mt-2 w-full normal-case lg:ml-2 lg:mt-0 lg:w-2/12" type="submit"
      :disabled="isSubmitting"
    >
      {{ t('common.add') }}
    </Button>
  </form>
</template>
