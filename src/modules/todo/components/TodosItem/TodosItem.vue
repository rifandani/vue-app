<script setup lang="ts">
import { twJoin } from 'tailwind-merge'
import { RouterLink } from 'vue-router'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { useUserStorage } from '../../../shared/composables/useUserStorage/useUserStorage.composable'
import type { TodoSchema } from '../../api/todo.schema'
import { useTodoDeleteMutation } from '../../composables/useTodoDeleteMutation.composable'
import { useTodoListParams } from '../../composables/useTodoListParams.composable'
import { useTodoUpdateMutation } from '../../composables/useTodoUpdateMutation.composable'

//#region VALUES
const props = defineProps<{
  todo: TodoSchema
}>()

const { LL } = typesafeI18n()
const user = useUserStorage()
const { queryKey } = useTodoListParams()
const todoUpdateMutation = useTodoUpdateMutation({ queryKey })
const todoDeleteMutation = useTodoDeleteMutation({ queryKey })
//#endregion

//#region HANDLERS
const onChangeTodo = () => {
  todoUpdateMutation.mutate({ ...props.todo, completed: !props.todo.completed })
}

const onDeleteTodo = (ev: Event) => {
  // don't allow if not the correct auth user
  if (props.todo.userId !== user.value?.id) return

  const target = ev.target as HTMLFormElement
  // parse form data & get todo id from input hidden with name/id `todoId`
  const formData = new FormData(target)
  const { todoId } = Object.fromEntries(formData.entries())

  todoDeleteMutation.mutate(Number(todoId))
}
//#endregion
</script>

<template>
  <form id="item-form" class="mb-2 flex items-center justify-between" @submit="onDeleteTodo">
    <input
      id="todoId"
      data-testid="item-input-todoId"
      type="hidden"
      name="todoId"
      :value="todo.id"
    />

    <input
      :id="`todo-${todo.id}`"
      data-testid="item-input-todo"
      class="checkbox-accent checkbox"
      type="checkbox"
      :name="`todo-${todo.id}`"
      :checked="todo.completed"
      @change="onChangeTodo"
    />

    <RouterLink
      id="item-link"
      :to="`/todos/${todo.id}`"
      :class="
        twJoin(
          'ml-5 w-full text-left text-lg text-secondary-content hover:font-bold',
          todo.completed && 'line-through'
        )
      "
    >
      {{ todo.todo }}
    </RouterLink>

    <button
      v-if="todo.userId === user?.id"
      id="item-button"
      class="btn-accent btn-sm btn normal-case"
      type="submit"
    >
      {{ LL.forms.remove({ icon: '💥' }) }}
    </button>
  </form>
</template>
