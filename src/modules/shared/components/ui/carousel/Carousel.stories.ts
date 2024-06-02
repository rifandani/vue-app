import type { Meta, StoryObj } from '@storybook/vue3'
import { Card, CardContent } from '../card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '.'

const subcomponents = {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  subcomponents,
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Carousel, ...subcomponents, Card, CardContent },
    setup() {
      return { args }
    },
    template: `
      <Carousel class="relative w-full max-w-xs" v-bind="args">
        <CarouselContent>
          <CarouselItem v-for="(_, index) in 5" :key="index">
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    `,
  }),
}
