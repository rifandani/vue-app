<script setup lang="ts">
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import { NavBar } from '../../../shared/components/organisms'
import TodosCreate from '../../components/TodosCreate/TodosCreate.vue'
import TodosFilter from '../../components/TodosFilter/TodosFilter.vue'
import TodosList from '../../components/TodosList/TodosList.vue'

const { LL } = typesafeI18n()
</script>

<template>
  <NavBar>
    <main
      class="flex flex-col items-center justify-center px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52"
    >
      <h1 class="mb-10 text-2xl font-semibold tracking-wider text-primary-content">
        {{ LL.common.list('Todo') }}
      </h1>

      <section
        class="card w-full rounded-lg border bg-secondary p-5 text-secondary-content shadow-lg"
      >
        <TodosCreate />

        <TodosFilter />

        <TodosList />
      </section>
    </main>
  </NavBar>
</template>
