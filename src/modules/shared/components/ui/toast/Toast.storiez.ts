import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import { Button } from '../button'
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toaster, useToast } from '.'

const subcomponents = {
  Toast,
  ToastViewport,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
  ToastProvider,
}

const meta = {
  title: 'UI/Toast',
  component: Toaster,
  subcomponents,
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Toaster, ...subcomponents, Button },
    setup() {
      const { toast } = useToast()

      function onClick() {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
      }

      return { args, onClick }
    },
    template: `
      <div>
        <Toaster v-bind="args" />
        <Button
          variant="outline" @click="onClick"
        >
          Show Toast
        </Button>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithAction: Story = {
  render: args => ({
    components: { Toaster, ...subcomponents, Button },
    setup() {
      const { toast } = useToast()

      function onClick() {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: h(ToastAction, {
            altText: 'Try again',
          }, {
            default: () => 'Try again',
          }),
        })
      }

      return { args, onClick }
    },
    template: `
      <div>
        <Toaster v-bind="args" />
        <Button
          variant="destructive" @click="onClick"
        >
          Show Toast
        </Button>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
