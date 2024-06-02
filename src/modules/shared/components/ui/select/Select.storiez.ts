import type { Meta, StoryObj } from '@storybook/vue3'
import { Select, SelectContent, SelectGroup, SelectItem, SelectItemText, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from '.'

const subcomponents = {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

const meta = {
  title: 'UI/Select',
  component: Select,
  subcomponents,
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Select, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">
              Apple
            </SelectItem>
            <SelectItem value="banana">
              Banana
            </SelectItem>
            <SelectItem value="blueberry">
              Blueberry
            </SelectItem>
            <SelectItem value="grapes">
              Grapes
            </SelectItem>
            <SelectItem value="pineapple">
              Pineapple
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const Scrollable: Story = {
  render: args => ({
    components: { Select, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <Select v-bind="args">
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">
              Eastern Standard Time (EST)
            </SelectItem>
            <SelectItem value="cst">
              Central Standard Time (CST)
            </SelectItem>
            <SelectItem value="mst">
              Mountain Standard Time (MST)
            </SelectItem>
            <SelectItem value="pst">
              Pacific Standard Time (PST)
            </SelectItem>
            <SelectItem value="akst">
              Alaska Standard Time (AKST)
            </SelectItem>
            <SelectItem value="hst">
              Hawaii Standard Time (HST)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value="gmt">
              Greenwich Mean Time (GMT)
            </SelectItem>
            <SelectItem value="cet">
              Central European Time (CET)
            </SelectItem>
            <SelectItem value="eet">
              Eastern European Time (EET)
            </SelectItem>
            <SelectItem value="west">
              Western European Summer Time (WEST)
            </SelectItem>
            <SelectItem value="cat">
              Central Africa Time (CAT)
            </SelectItem>
            <SelectItem value="eat">
              East Africa Time (EAT)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="msk">
              Moscow Time (MSK)
            </SelectItem>
            <SelectItem value="ist">
              India Standard Time (IST)
            </SelectItem>
            <SelectItem value="cst_china">
              China Standard Time (CST)
            </SelectItem>
            <SelectItem value="jst">
              Japan Standard Time (JST)
            </SelectItem>
            <SelectItem value="kst">
              Korea Standard Time (KST)
            </SelectItem>
            <SelectItem value="ist_indonesia">
              Indonesia Central Standard Time (WITA)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Australia & Pacific</SelectLabel>
            <SelectItem value="awst">
              Australian Western Standard Time (AWST)
            </SelectItem>
            <SelectItem value="acst">
              Australian Central Standard Time (ACST)
            </SelectItem>
            <SelectItem value="aest">
              Australian Eastern Standard Time (AEST)
            </SelectItem>
            <SelectItem value="nzst">
              New Zealand Standard Time (NZST)
            </SelectItem>
            <SelectItem value="fjt">
              Fiji Time (FJT)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>South America</SelectLabel>
            <SelectItem value="art">
              Argentina Time (ART)
            </SelectItem>
            <SelectItem value="bot">
              Bolivia Time (BOT)
            </SelectItem>
            <SelectItem value="brt">
              Brasilia Time (BRT)
            </SelectItem>
            <SelectItem value="clt">
              Chile Standard Time (CLT)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
