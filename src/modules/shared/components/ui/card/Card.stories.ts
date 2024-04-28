import type { Meta, StoryObj } from '@storybook/vue3'
import Label from '../label/Label.vue'
import Input from '../input/Input.vue'
import Button from '../button/Button.vue'
import Card from './Card.vue'
import CardContent from './CardContent.vue'
import CardDescription from './CardDescription.vue'
import CardFooter from './CardFooter.vue'
import CardHeader from './CardHeader.vue'
import CardTitle from './CardTitle.vue'

const subcomponents = {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}

const meta = {
  title: 'UI/Card',
  tags: ['autodocs'],
  component: Card,
  subcomponents,
  render: args => ({
    components: { Label, Input, Button, Card, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <Card class="w-[350px]" v-bind="args">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div class="grid items-center w-full gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button variant="outline">
            Cancel
          </Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    `,
  }),
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
