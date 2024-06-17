import type { Meta, StoryObj } from '@storybook/vue3'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '.'

const subcomponents = { HoverCardContent, HoverCardTrigger }

const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  subcomponents,
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { HoverCard, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <HoverCard v-bind="args">
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>
          The Vue Framework - created and maintained by @vuejs.
        </HoverCardContent>
      </HoverCard>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
