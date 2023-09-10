<script setup lang="ts">
import { typesafeI18n } from '@i18n/i18n-vue'
import { NavBar } from '@shared/components/organisms'
import TodosCreate from '@todo/components/TodosCreate/TodosCreate.vue'
import TodosFilter from '@todo/components/TodosFilter/TodosFilter.vue'
import TodosList from '@todo/components/TodosList/TodosList.vue'

const { LL } = typesafeI18n()
</script>

<template>
  <NavBar>
    <main
      class="flex flex-col items-center justify-center px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52"
    >
      <h1 class="mb-10 text-2xl font-semibold tracking-wider">
        {{ LL.common.list('Todo') }}
      </h1>

      <section class="card w-full bg-base-200 p-5 shadow-lg">
        <TodosCreate />

        <TodosFilter />

        <TodosList />
      </section>
    </main>
  </NavBar>
</template>
