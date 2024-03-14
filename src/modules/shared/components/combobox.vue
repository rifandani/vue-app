<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { twMerge } from 'tailwind-merge'
import { useId } from 'radix-vue'
import { Button } from '#shared/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '#shared/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#shared/components/ui/popover'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref({})
const id = useId()
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <!-- aria-controls here with useId should be associated with the expanded list container (ul) -->
      <Button variant="outline" role="combobox" :aria-expanded="open" :aria-controls="id" class="w-[200px] justify-between">
        {{ value ? frameworks.find((framework) => framework.value === value)?.label : 'Select framework...' }}
        <Icon icon="lucide:chevrons-up-down" class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[200px] p-0">
      <Command v-model="value">
        <CommandInput placeholder="Search framework..." />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="framework in frameworks" :key="framework.value" :value="framework"
              @select="open = false"
            >
              <Check
                :class="twMerge(
                  'mr-2 h-4 w-4',
                  value === framework.value ? 'opacity-100' : 'opacity-0',
                )"
              />
              {{ framework.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
