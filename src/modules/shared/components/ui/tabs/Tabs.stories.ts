import type { Meta, StoryObj } from '@storybook/vue3'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'

const subcomponents = {
  TabsContent,
  TabsList,
  TabsTrigger,
}

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  subcomponents,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Tabs, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <Tabs default-value="account" class="w-[400px]" v-bind="args">
        <TabsList>
          <TabsTrigger value="account">
            Account
          </TabsTrigger>
          <TabsTrigger value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">
          Change your password here.
        </TabsContent>
      </Tabs>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
