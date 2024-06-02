import type { Meta, StoryObj } from '@storybook/vue3'
import { Separator } from '../separator'
import { ScrollArea, ScrollBar } from '.'

const subcomponents = {
  ScrollBar,
}

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  subcomponents,
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { ScrollArea, ...subcomponents, Separator },
    setup() {
      const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`,
      )

      return { args, tags }
    },
    template: `
      <ScrollArea class="h-72 w-48 rounded-md border" v-bind="args">
        <div class="p-4">
          <h4 class="mb-4 text-sm font-medium leading-none">
            Tags
          </h4>

          <div v-for="tag in tags" :key="tag">
            <div class="text-sm">
              {{ tag }}
            </div>
            <Separator class="my-2" />
          </div>
        </div>
      </ScrollArea>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const Horizontal: Story = {
  render: args => ({
    components: { ScrollArea, ...subcomponents },
    setup() {
      const works = [
        {
          id: '1',
          artist: 'Ornella Binni',
          art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
        },
        {
          id: '2',
          artist: 'Tom Byrom',
          art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
        },
        {
          id: '3',
          artist: 'Vladimir Malyavko',
          art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
        },
      ]

      return { args, works }
    },
    template: `
      <ScrollArea class="border rounded-md w-96 whitespace-nowrap" v-bind="args">
        <div class="flex p-4 space-x-4 w-max">
          <div v-for="artwork in works" :key="artwork.id">
            <figure class="shrink-0">
              <div class="overflow-hidden rounded-md">
                <img
                  :src="artwork.art"
                  class="aspect-[3/4] w-36 h-56 object-cover"
                >
              </div>
              <figcaption class="pt-2 text-xs text-muted-foreground">
                Photo by
                <span class="font-semibold text-foreground">
                  {{ artwork.artist }}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
