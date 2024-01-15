import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'
import type { ComputedRef } from 'vue'
import type { todoKeys } from '#todo/api/todo.api'
import { todoApi } from '#todo/api/todo.api'
import type {
  TodoListApiResponseSchema,
  UpdateTodoApiResponseSchema,
  UpdateTodoSchema,
} from '#todo/api/todo.schema'
import type { ErrorApiResponseSchema } from '#shared/api/error.schema'
import { typesafeI18n } from '#i18n/i18n-vue'

interface CreateTodoUpdateMutationProps {
  queryKey: ComputedRef<ReturnType<typeof todoKeys.list>>
}

export function useTodoUpdateMutation({ queryKey }: CreateTodoUpdateMutationProps) {
  const queryClient = useQueryClient()
  const { LL } = typesafeI18n()
  const toast = useToast()

  return useMutation<
    UpdateTodoApiResponseSchema,
    ErrorApiResponseSchema,
    UpdateTodoSchema,
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async ({ id, ...body }) => {
      const emptyResponse: TodoListApiResponseSchema = {
        limit: 10,
        todos: [],
        skip: 0,
        total: 0,
      }
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey })

      // Snapshot the previous value
      const previousTodosQueryResponse
        = (queryClient.getQueryData(queryKey) as TodoListApiResponseSchema) ?? emptyResponse

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos.map(_todo =>
          _todo.id === id ? { ..._todo, ...body } : _todo,
        ),
      })

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse }
    },
    mutationFn: updateTodo => todoApi.update(updateTodo),
    onSettled: (_updateTodo, error, _variables, context) => {
      toast.add({
        life: 3_000,
        severity: error ? 'error' : 'success',
        detail: error
          ? LL.value.error.action({ module: 'Todo', action: 'update' })
          : LL.value.success.action({ module: 'Todo', action: 'updated' }),
      })

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error)
        queryClient.setQueryData(queryKey, context?.previousTodosQueryResponse)

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey });
    },
  })
}
