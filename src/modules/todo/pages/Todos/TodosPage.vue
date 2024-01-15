<script setup lang="ts">
import TodosCreate from '#todo/components/TodosCreate/TodosCreate.vue'
import TodosFilter from '#todo/components/TodosFilter/TodosFilter.vue'
import TodosList from '#todo/components/TodosList/TodosList.vue'
import TheNavbar from '#shared/components/organisms/TheNavbar/TheNavbar.vue'
import { typesafeI18n } from '#i18n/i18n-vue'

const { LL } = typesafeI18n()
</script>

<template>
  <TheNavbar />

  <main class="container mx-auto flex flex-col items-center py-5 duration-300">
    <h1 class="text-3xl font-medium sm:text-4xl">
      {{ LL.common.list('Todo') }}
    </h1>

    <section class="w-full p-5">
      <TodosCreate />

      <TodosFilter />

      <TodosList />
    </section>
  </main>
</template>
