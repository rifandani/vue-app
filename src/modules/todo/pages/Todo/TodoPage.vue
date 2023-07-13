<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { typesafeI18n } from '../../../../i18n/i18n-vue'

//#region VALUES
const { LL } = typesafeI18n()
// const id = derived(params, ($params) => {
//   // initial load, `$params === undefined`
//   // -1 to make query options `enabled: false`
//   if (!$params) return -1

//   // will throw error if `params.id` is not a number
//   const id = z.coerce.number().parse($params.id)
//   return Number(id)
// })
// const { queryOptions } = createTodoDetailQuery(id)
// const { toaster } = createToast()
// const queryClient = useQueryClient()

// $: todoQuery = createQuery($queryOptions)
// $: todoUpdateMutation = createMutation<
//   UpdateTodoApiResponseSchema,
//   ErrorApiResponseSchema,
//   UpdateTodoSchema
// >({
//   mutationFn: (updateTodo) => todoApi.update(updateTodo),
//   onSuccess: async (updatedTodo) => {
//     // NOTE: the order of function call MATTERS
//     push('/todos')
//     queryClient.removeQueries({ queryKey: todoKeys.detail(updatedTodo.id) }) // delete the query cache
//     await queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
//   },
//   onSettled: (_updateTodo, error) => {
//     toaster.create({
//       type: error ? 'error' : 'success',
//       title: error
//         ? $LL.common.xUpdateError({ feature: 'Todo' })
//         : $LL.common.xUpdateSuccess({ feature: 'Todo' })
//     })
//   }
// })
// const { form } = createForm<Pick<UpdateTodoSchema, 'todo'>>({
//   onSubmit: (values) => {
//     const payload: UpdateTodoSchema = {
//       ...values,
//       id: $todoQuery.data?.id,
//       completed: $todoQuery.data?.completed
//     }

//     $todoUpdateMutation.mutate(payload)
//   }
// })
//#endregion
</script>

<template>
  <NavBar>
    <section class="flex flex-col justify-center px-10 py-20 md:px-24 lg:px-40 xl:px-52">
      <div class="mb-10 flex w-full flex-col space-y-2">
        <RouterLink to="/todos" class="btn-link w-fit normal-case text-primary-content">
          ⬅ {{ LL.todo.backTo({ target: 'Todos' }) }}
        </RouterLink>

        <h1 class="text-2xl font-semibold tracking-wider text-primary-content">
          {{ LL.common.xDetail({ feature: 'Todo' }) }}
        </h1>
      </div>

      <!-- {#if $todoUpdateMutation.isError} -->
      <div class="alert alert-error mt-2 shadow-lg">
        <div class="flex items-center">
          <span>
            {{ LL.common.error({ module: 'Todo Mutation' }) }}:{{ ' ' }}
            <!-- {$todoUpdateMutation.error.message} -->
          </span>
        </div>
      </div>

      <!-- {#if $todoQuery.isLoading} -->
      <div class="flex items-center justify-center py-5">
        <Icon icon="svg-spinners:3-dots-fade" height="5em" class="text-secondary-content" />
      </div>

      <!-- {#if $todoQuery.isError} -->
      <div class="alert alert-error mt-2 shadow-lg">
        <div class="flex items-center">
          <span>{{ LL.common.error({ module: 'Todos' }) }}:</span>
          <!-- <pre>{JSON.stringify($todoQuery.error, null, 2)}</pre> -->
        </div>
      </div>

      <!-- {#if $todoQuery.isSuccess} -->
      <form data-testid="form" class="join">
        <!-- :value="todoQuery.data?.todo ?? LL.common.loading()" -->
        <input
          id="todo"
          data-testid="input-todo"
          class="input-bordered input-accent input join-item w-full text-accent-content"
          name="todo"
          type="text"
          required
        />

        <button
          data-testid="button-submit"
          class="btn-accent join-item btn normal-case"
          type="submit"
        >
          {{ LL.common.update({ icon: '🖋' }) }}
        </button>
      </form>
    </section>
  </NavBar>
</template>
