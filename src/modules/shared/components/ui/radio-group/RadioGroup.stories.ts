import type { Meta, StoryObj } from '@storybook/vue3'
import { Label } from '../label'
import { RadioGroup, RadioGroupItem } from '.'

const subcomponents = {
  RadioGroupItem,
}

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  subcomponents,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { RadioGroup, ...subcomponents, Label },
    setup() {
      return { args }
    },
    template: `
      <RadioGroup default-value="comfortable" v-bind="args">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r1" value="default" />
          <Label for="r1">Default</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r2" value="comfortable" />
          <Label for="r2">Comfortable</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r3" value="compact" />
          <Label for="r3">Compact</Label>
        </div>
      </RadioGroup>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
