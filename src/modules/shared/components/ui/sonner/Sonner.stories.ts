import type { Meta, StoryObj } from '@storybook/vue3'
import { toast } from 'vue-sonner'
import { Button } from '../button'
import { Toaster } from '.'

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Toaster, Button },
    setup() {
      function onClick() {
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            // eslint-disable-next-line no-console
            onClick: () => console.log('Undo'),
          },
        })
      }

      return { args, onClick }
    },
    template: `
      <div>
        <Toaster :duration="3_000" position="bottom-right" v-bind="args" />
        <Button
          variant="outline" @click="onClick"
        >
          Add to calendar
        </Button>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
