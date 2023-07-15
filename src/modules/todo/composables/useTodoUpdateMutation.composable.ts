import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'
import { typesafeI18n } from '../../../i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '../../shared/api/error.schema'
import { todoApi, todoKeys } from '../api/todo.api'
import type {
  TodoListApiResponseSchema,
  UpdateTodoApiResponseSchema,
  UpdateTodoSchema
} from '../api/todo.schema'

type CreateTodoUpdateMutationProps = {
  queryKey: ComputedRef<ReturnType<typeof todoKeys.list>>
}

export const useTodoUpdateMutation = ({ queryKey }: CreateTodoUpdateMutationProps) => {
  const queryClient = useQueryClient()
  const { LL } = typesafeI18n()
  // const { toaster } = createToast();

  const errorTitle = LL.value.error.action({ module: 'Todo', action: 'update' })
  const successTitle = LL.value.success.action({ module: 'Todo', action: 'updated' })

  return useMutation<
    UpdateTodoApiResponseSchema,
    ErrorApiResponseSchema,
    UpdateTodoSchema,
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async ({ id, ...body }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey })

      // Snapshot the previous value
      const previousTodosQueryResponse = (queryClient.getQueryData(queryKey) ??
        []) as TodoListApiResponseSchema

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos?.map((_todo) =>
          _todo.id === id ? { ..._todo, ...body } : _todo
        )
      })

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse }
    },
    mutationFn: (updateTodo) => todoApi.update(updateTodo),
    onSettled: (_updateTodo, error, _variables, context) => {
      // toaster.create({
      //   type: error ? 'error' : 'success',
      //   title: error ? errorTitle : successTitle
      // })

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error) queryClient.setQueryData(queryKey, context?.previousTodosQueryResponse)

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey });
    }
  })
}
