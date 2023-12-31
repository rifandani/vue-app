<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import type { TodoSchema } from '@todo/api/todo.schema'
import { useTodoDeleteMutation } from '@todo/composables/useTodoDeleteMutation.composable'
import { useTodoListParams } from '@todo/composables/useTodoListParams.composable'
import { useTodoUpdateMutation } from '@todo/composables/useTodoUpdateMutation.composable'
import { todosDetailRoute } from '@todo/routes/todo.route'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { twJoin } from 'tailwind-merge'
import { RouterLink } from 'vue-router'

//#region VALUES
const props = defineProps<{
  todo: TodoSchema
}>()

const user = useUserStorage()
const { queryKey } = useTodoListParams()
const todoUpdateMutation = useTodoUpdateMutation({ queryKey })
const todoDeleteMutation = useTodoDeleteMutation({ queryKey })
//#endregion

//#region HANDLERS
const onChangeTodo = () => {
  todoUpdateMutation.mutate({ ...props.todo, completed: !props.todo.completed })
}

const onDeleteTodo = (evt: Event) => {
  // don't allow if not the correct auth user
  if (props.todo.userId !== user.value?.id) return

  const target = evt.target as HTMLFormElement
  // parse form data & get todo id from input hidden with name/id `todoId`
  const formData = new FormData(target)
  const { todoId } = Object.fromEntries(formData.entries())

  todoDeleteMutation.mutate(Number(todoId))
}
//#endregion
</script>

<template>
  <form
    aria-label="form-todo"
    class="mb-2 flex items-center justify-between"
    :data-testid="`form-${props.todo.id}`"
    @submit.prevent="onDeleteTodo"
  >
    <input
      id="todoId"
      name="todoId"
      type="hidden"
      data-testid="input-todoId"
      :value="props.todo.id"
    />

    <Checkbox
      binary
      aria-label="checkbox-todo"
      :name="`todo-${props.todo.id}`"
      :input-id="`todo-${props.todo.id}`"
      :model-value="props.todo.completed"
      @change="onChangeTodo"
    />

    <RouterLink
      role="link"
      aria-label="todo"
      :to="{ name: todosDetailRoute.name, params: { id: props.todo.id } }"
      :class="
        twJoin(
          'ml-5 w-full text-left text-lg hover:font-bold',
          props.todo.completed ? 'line-through' : 'no-underline',
          props.todo.userId === user?.id ? 'text-color-primary' : 'text-color'
        )
      "
    >
      {{ props.todo.todo }}
    </RouterLink>

    <Button
      v-if="props.todo.userId === user?.id"
      outlined
      rounded
      aria-label="button-submit"
      class="min-w-fit p-2 normal-case"
      type="submit"
      size="small"
      severity="danger"
      :disabled="todoDeleteMutation.isPending.value"
    >
      <Icon icon="lucide:trash-2" class="text-red-500" />
    </Button>
  </form>
</template>
