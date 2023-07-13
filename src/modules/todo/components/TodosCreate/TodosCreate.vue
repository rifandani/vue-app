<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { useTodoListQuery } from '../../stores/useTodoListQuery.store'

//#region VALUES
const { LL } = typesafeI18n()
const queryClient = useQueryClient()
const { route } = useTodoListQuery()
console.log('🚀 ~ file: TodosCreate.vue:10 ~ route:', route)
// const todoCreateMutation = createTodoCreateMutation({ queryKey: $queryOptions.queryKey })

// const { form } = createForm<TodoSchema>({
//   extend: [validator({ schema: todoSchema })],
//   initialValues: {
//     id: 1, // doesn't matter, we override it later on `onSubmit` anyway
//     todo: '',
//     userId: $user.id,
//     completed: false
//   },
//   onSubmit: (values, { reset }) => {
//     const payload = {
//       ...values,
//       id: random(11, 999_999)
//     }

//     $todoCreateMutation.mutate(payload, {
//       onSettled: (_newTodo, error, _variables, context) => {
//         // reset form
//         reset()

//         toaster.create({
//           type: error ? 'error' : 'success',
//           title: error
//             ? $LL.error.action({ module: 'Todo', action: 'create' })
//             : $LL.success.action({ module: 'Todo', action: 'created' })
//         })

//         // If the mutation fails, use the context returned from `onMutate` to roll back
//         if (error)
//           queryClient.setQueryData($queryOptions.queryKey, context?.previousTodosQueryResponse)
//       }
//     })
//   }
// })
//#endregion
</script>

<template>
  <form data-testid="form" class="form-control mb-3 w-full duration-300 lg:flex-row">
    <input
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
