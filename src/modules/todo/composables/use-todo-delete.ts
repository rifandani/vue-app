import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'
import type { ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DeleteTodoApiResponseSchema, DeleteTodoSchema, TodoListApiResponseSchema, todoKeys } from '#todo/apis/todo'
import { todoApi } from '#todo/apis/todo'
import type { ErrorApiResponseSchema } from '#shared/schemas/error'

interface CreateTodoDeleteMutationProps {
  queryKey: ComputedRef<ReturnType<typeof todoKeys.list>>
}

/**
 * delete todo mutation based on `useTodosParams` and show toast
 */
export function useTodoDelete({ queryKey }: CreateTodoDeleteMutationProps) {
  const queryClient = useQueryClient()
  const { t } = useI18n()
  const toast = useToast()

  return useMutation<
    DeleteTodoApiResponseSchema,
    ErrorApiResponseSchema,
    DeleteTodoSchema['id'],
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (id) => {
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
      queryClient.setQueryData(queryKey.value, {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos.filter(_todo => _todo.id !== id),
      })

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse }
    },
    mutationFn: id => todoApi.delete(id),
    onSettled: (_id, error, _variables, context) => {
      toast.add({
        life: 3_000,
        severity: error ? 'error' : 'success',
        detail: error
          ? t('common.xDeleteError', { feature: 'Todo' })
          : t('common.xDeleteSuccess', { feature: 'Todo' }),
      })

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error)
        queryClient.setQueryData(queryKey.value, context?.previousTodosQueryResponse)

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey });
    },
  })
}
