<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { twJoin } from 'tailwind-merge'
import { RouterLink } from 'vue-router'
import type { TodoSchema } from '#todo/apis/todo'
import { useTodoDelete } from '#todo/composables/use-todo-delete'
import { useTodoListParams } from '#todo/composables/use-todo-list-params'
import { useTodoUpdate } from '#todo/composables/use-todo-update'
import { todosDetailRoute } from '#todo/routes'
import { useUserStorage } from '#shared/composables/use-user-storage'
import { Button } from '#shared/components/ui/button'
import { Checkbox } from '#shared/components/ui/checkbox'

// #region VALUES
const props = defineProps<{
  todo: TodoSchema
}>()

const user = useUserStorage()
const { queryKey } = useTodoListParams()
const todoUpdateMutation = useTodoUpdate({ queryKey })
const todoDeleteMutation = useTodoDelete({ queryKey })
// #endregion

// #region HANDLERS
function onDeleteTodo(evt: Event) {
  // don't allow if not the correct auth user
  if (props.todo.userId !== user.value?.id)
    return

  const target = evt.target as HTMLFormElement
  // parse form data & get todo id from input hidden with name/id `todoId`
  const formData = new FormData(target)
  const { todoId } = Object.fromEntries(formData.entries())

  todoDeleteMutation.mutate(Number(todoId))
}
// #endregion
</script>

<template>
  <form
    aria-label="form-todo" class="mb-2 flex items-center justify-between" :data-testid="`form-${props.todo.id}`"
    @submit.prevent="onDeleteTodo"
  >
    <input id="todoId" name="todoId" type="hidden" data-testid="input-todoId" :value="props.todo.id">

    <Checkbox
      :id="`todo-${props.todo.id}`" aria-label="checkbox-todo" :name="`todo-${props.todo.id}`"
      :checked="props.todo.completed" @update:checked="() => {
        todoUpdateMutation.mutate({ ...props.todo, completed: !props.todo.completed })
      }"
    />

    <RouterLink
      role="link" aria-label="todo" :to="{ name: todosDetailRoute.name, params: { id: props.todo.id } }" :class="twJoin(
        'ml-5 w-full text-left text-lg hover:font-bold',
        props.todo.completed ? 'line-through' : 'no-underline',
      )
      "
    >
      {{ props.todo.todo }}
    </RouterLink>

    <Button
      v-if="props.todo.userId === user?.id" aria-label="button-submit"
      class="min-w-fit" type="submit" size="sm" variant="ghost"
      :disabled="todoDeleteMutation.isPending.value"
    >
      <Icon icon="lucide:trash-2" class="text-red-500" />
    </Button>
  </form>
</template>
