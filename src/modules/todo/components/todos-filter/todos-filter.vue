<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { limits } from '#todo/constants/todos'
import { useTodoListParams } from '#todo/composables/use-todo-list-params'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '#shared/components/ui/select'

// #region VALUES
const { t } = useI18n()
const router = useRouter()
const { queryParams } = useTodoListParams()
const selectedOption = computed(() => queryParams.value.limit.toString())
// #endregion
</script>

<template>
  <form aria-label="form-filter" class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2">
    <label for="limit" class="flex items-center space-x-3">
      <p class="text-base font-normal">{{ t('common.limit') }}</p>
      <Select id="limit" name="limit" :model-value="selectedOption">
        <SelectTrigger class="w-32" data-testid="combobox-btn">
          <SelectValue placeholder="Select the limit" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="limit in limits" :key="limit" :value="limit" @click="async () => {
                await router.replace({ query: { limit } })
              }"
            >
              {{ limit }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  </form>
</template>
