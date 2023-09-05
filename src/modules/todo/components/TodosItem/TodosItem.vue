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

    <input
      :id="`todo-${props.todo.id}`"
      class="checkbox-accent checkbox"
      type="checkbox"
      aria-label="checkbox-todo"
      :name="`todo-${props.todo.id}`"
      :checked="props.todo.completed"
      @change="onChangeTodo"
    />

    <RouterLink
      role="link"
      aria-label="todo"
      :to="{ name: 'todo', params: { id: props.todo.id } }"
      :class="
        twJoin(
          'ml-5 w-full text-left text-lg text-secondary-content hover:font-bold',
          props.todo.completed && 'line-through'
        )
      "
    >
      {{ props.todo.todo }}
    </RouterLink>

    <button
      v-if="props.todo.userId === user?.id"
      aria-label="button-submit"
      class="btn btn-accent btn-sm normal-case disabled:btn-disabled"
      type="submit"
      :disabled="todoDeleteMutation.isLoading.value"
    >
      {{ LL.forms.remove({ icon: '💥' }) }}
    </button>
  </form>
</template>
