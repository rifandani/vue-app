import type { SetRequired } from 'type-fest'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { defaultLimit } from '#todo/constants/todos.constant'
import { todoKeys } from '#todo/api/todo.api'
import { createSearchParamsFromObject } from '#shared/utils/helper/helper.util'
import type { ResourceParamsSchema } from '#shared/api/resource.schema'

export function useTodoListParams() {
  const route = useRoute()

  const searchParams = computed(() => createSearchParamsFromObject(route.query))
  const queryParams = computed<SetRequired<ResourceParamsSchema, 'limit'>>(() => ({
    ...route.query,
    limit: Number(route.query.limit ?? defaultLimit),
  }))
  const queryKey = computed(() =>
    todoKeys.list({
      ...route.query,
      limit: Number(route.query.limit ?? defaultLimit),
    }),
  )

  return { searchParams, queryParams, queryKey } as const
}
