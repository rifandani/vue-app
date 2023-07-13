<script setup lang="ts">
import { typesafeI18n } from '@/i18n/i18n-vue'
import { twJoin } from 'tailwind-merge'
import { RouterLink } from 'vue-router'
import type { TodoSchema } from '../../api/todo.schema'

//#region VALUES
const props = defineProps<{
  todo: TodoSchema
}>()

const { LL } = typesafeI18n()
// const { queryOptions } = createTodoListQuery();
// const { store: user } = createLocalStorage<LoginApiResponseSchema>('user');
// $: todoUpdateMutation = createTodoUpdateMutation({ queryKey: $queryOptions.queryKey });
// $: todoDeleteMutation = createTodoDeleteMutation({ queryKey: $queryOptions.queryKey });
//#endregion

//#region HANDLERS
// const onChangeTodo: HTMLInputAttributes['on:change'] = () => {
//   $todoUpdateMutation.mutate({ ...todo, completed: !todo.completed });
// };

// const onDeleteTodo: HTMLFormAttributes['on:submit'] = (ev) => {
//   // don't allow if not the correct auth user
//   if (todo.userId !== $user.id) return;

//   // parse form data & get todo id from input hidden with name/id `todoId`
//   const formData = new FormData(ev.currentTarget);
//   const { todoId } = Object.fromEntries(formData.entries());

//   $todoDeleteMutation.mutate(Number(todoId));
// };
//#endregion
</script>

<template>
  <!-- on:submit|preventDefault={onDeleteTodo} -->
  <form data-testid="form" class="mb-2 flex items-center justify-between">
    <input id="todoId" data-testid="input-todoId" value="{todo.id}" type="hidden" name="todoId" />

    <!-- on:change={onChangeTodo} -->
    <input
      :id="`todo-${todo.id}`"
      :name="`todo-${todo.id}`"
      :checked="todo.completed"
      data-testid="input-todo"
      class="checkbox-accent checkbox"
      type="checkbox"
    />

    <RouterLink
      :to="`/todos/${todo.id}`"
      :class="
        twJoin(
          'ml-5 w-full text-left text-lg text-secondary-content hover:font-bold',
          todo.completed && 'line-through'
        )
      "
      data-testid="p-todo"
    >
      {{ todo.todo }}
    </RouterLink>

    <!-- {#if todo.userId === $user.id} -->
    <button data-testid="button-remove" class="btn-accent btn-sm btn normal-case" type="submit">
      {{ LL.forms.remove({ icon: '💥' }) }}
    </button>
  </form>
</template>
