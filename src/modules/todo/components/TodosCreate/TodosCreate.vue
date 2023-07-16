<script setup lang="ts">
import { random } from '@rifandani/nxact-yutiriti'
import { useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { useUserStorage } from '../../../shared/composables/useUserStorage/useUserStorage.composable'
import { todoSchema } from '../../api/todo.schema'
import { useTodoCreateMutation } from '../../composables/useTodoCreateMutation.composable'
import { useTodoListParams } from '../../composables/useTodoListParams.composable'

//#region VALUES
const { LL } = typesafeI18n()
const user = useUserStorage()
const queryClient = useQueryClient()
const { queryKey } = useTodoListParams()
const todoCreateMutation = useTodoCreateMutation({ queryKey })

const { errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(todoSchema),
  initialValues: {
    id: 1, // doesn't matter, we override it later on `onSubmit` anyway
    todo: '',
    userId: user.value?.id,
    completed: false
  }
})
const todo = defineInputBinds('todo', { validateOnInput: true })
const onSubmit = handleSubmit((values, { resetForm }) => {
  const payload = {
    ...values,
    id: random(11, 999_999)
  }

  todoCreateMutation.mutate(payload, {
    onSettled: (_newTodo, error, _variables, context) => {
      // reset form
      resetForm()

      // toaster.create({
      //   type: error ? 'error' : 'success',
      //   title: error
      //     ? $LL.error.action({ module: 'Todo', action: 'create' })
      //     : $LL.success.action({ module: 'Todo', action: 'created' })
      // })

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error) queryClient.setQueryData(queryKey, context?.previousTodosQueryResponse)
    }
  })
})
//#endregion
</script>

<template>
  <form
    data-testid="form"
    class="form-control mb-3 w-full duration-300 lg:flex-row"
    @submit="onSubmit"
  >
    <input
      v-bind="todo"
      id="todo"
      data-testid="input-todo"
      class="input-bordered input-accent input w-full text-accent-content lg:w-10/12"
      name="todo"
      type="text"
      required
      :placeholder="LL.forms.todoPlaceholder()"
    />

    <button
      data-testid="button-submit"
      class="btn-accent btn ml-0 mt-2 w-full normal-case lg:ml-2 lg:mt-0 lg:w-2/12"
      type="submit"
    >
      {{ LL.forms.add({ icon: '✔' }) }}
    </button>
  </form>
</template>
