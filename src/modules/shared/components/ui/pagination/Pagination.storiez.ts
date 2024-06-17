import type { Meta, StoryObj } from '@storybook/vue3'
import { PaginationRoot as Pagination, PaginationList, PaginationListItem } from 'radix-vue'
import { Button } from '../button'
import { PaginationEllipsis, PaginationFirst, PaginationLast, PaginationNext, PaginationPrev } from '.'

const subcomponents = {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationPrev,
  PaginationList,
  PaginationListItem,
}

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  subcomponents,
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Pagination, ...subcomponents, Button },
    setup() {
      return { args }
    },
    template: `
      <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2" v-bind="args">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button class="size-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
