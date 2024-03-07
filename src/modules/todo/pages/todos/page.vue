<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TodosCreate from '#todo/components/todos-create/todos-create.vue'
import TodosFilter from '#todo/components/todos-filter/todos-filter.vue'
import TodosList from '#todo/components/todos-list/todos-list.vue'
import NavBar from '#shared/components/nav-bar/nav-bar.vue'

const { t } = useI18n()
</script>

<template>
  <NavBar />

  <main class="container mx-auto flex flex-col items-center py-5 duration-300">
    <h1 class="text-3xl font-medium sm:text-4xl">
      {{ t("common.list", { feature: "Todo" }) }}
    </h1>

    <section class="w-full p-5">
      <TodosCreate />

      <TodosFilter />

      <TodosList />
    </section>
  </main>
</template>
