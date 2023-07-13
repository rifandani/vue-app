import type { CreateQueryOptions } from '@tanstack/svelte-query';
import { derived, type Readable } from 'svelte/store';
import type { ErrorApiResponseSchema } from '../../shared/api/error.schema';
import { todoApi, todoKeys } from '../api/todo.api';
import type { TodoDetailApiResponseSchema } from '../api/todo.schema';

export const createTodoDetailQuery = (id: Readable<number>) => {
  const queryOptions = derived<
    typeof id,
    CreateQueryOptions<
      TodoDetailApiResponseSchema,
      ErrorApiResponseSchema,
      TodoDetailApiResponseSchema,
      ReturnType<typeof todoKeys.detail>
    >
  >(id, ($id) => {
    return {
      enabled: $id > 0,
      queryKey: todoKeys.detail($id),
      queryFn: () => todoApi.detail($id),
    };
  });

  return { queryOptions } as const;
};
