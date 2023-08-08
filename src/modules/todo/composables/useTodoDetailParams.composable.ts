import { computed, type ComputedRef } from 'vue'
import { todoKeys } from '../api/todo.api'

type UseTodoDetailQuery = {
  id: ComputedRef<number>
}

export const useTodoDetailParams = ({ id }: UseTodoDetailQuery) => {
  const enabled = computed(() => id.value > 0)
  const queryKey = computed(() => todoKeys.detail(id.value))

  return { enabled, queryKey } as const
}
