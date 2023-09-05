import { todoKeys } from '@todo/api/todo.api'
import { computed, type ComputedRef } from 'vue'

type UseTodoDetailQuery = {
  id: ComputedRef<number>
}

export const useTodoDetailParams = ({ id }: UseTodoDetailQuery) => {
  const enabled = computed(() => id.value > 0)
  const queryKey = computed(() => todoKeys.detail(id.value))

  return { enabled, queryKey } as const
}
