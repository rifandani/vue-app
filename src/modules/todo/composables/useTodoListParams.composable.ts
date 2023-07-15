import type { UseQueryOptions } from '@tanstack/vue-query'
import type { SetRequired } from 'type-fest'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { ErrorApiResponseSchema } from '../../shared/api/error.schema'
import type { ResourceParamsSchema } from '../../shared/api/resource.schema'
import { createSearchParamsFromObject } from '../../shared/utils/helper.util'
import { todoApi, todoKeys } from '../api/todo.api'
import type { TodoListApiResponseSchema } from '../api/todo.schema'
import { defaultLimit } from '../constants/todos.constant'

export const useTodoListParams = () => {
  const route = useRoute()

  const searchParams = computed(() => createSearchParamsFromObject(route.query))
  const queryParams = computed<SetRequired<ResourceParamsSchema, 'limit'>>(() => ({
    ...route.query,
    limit: Number(route.query.limit ?? defaultLimit)
  }))
  const queryKey = computed(() =>
    todoKeys.list({
      ...route.query,
      limit: Number(route.query.limit ?? defaultLimit)
    })
  )
  const queryOptions = computed<
    UseQueryOptions<
      TodoListApiResponseSchema,
      ErrorApiResponseSchema,
      TodoListApiResponseSchema,
      ReturnType<typeof todoKeys.list>
    >
  >(() => ({
    queryKey,
    queryFn: ({ queryKey }) => todoApi.list(queryKey[2]),
    staleTime: 5_000
  }))

  return { searchParams, queryParams, queryKey, queryOptions } as const
}
