import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { Input } from '../input'
import { Button } from '../button'
import { toast } from '../toast'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '.'

const subcomponents = { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage }

const meta = {
  title: 'UI/Form',
  tags: ['autodocs'],
  component: Form,
  subcomponents,
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Form, ...subcomponents, Button, Input },
    setup() {
      const formSchema = toTypedSchema(z.object({
        username: z.string().min(2).max(50),
      }))

      const { handleSubmit } = useForm({
        validationSchema: formSchema,
      })

      const onSubmit = handleSubmit((values) => {
        toast({
          title: 'You submitted the following values:',
          description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
        })
      })
      return { args, onSubmit }
    },
    template: `
      <form class="w-2/3 space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit">
          Submit
        </Button>
      </form>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
