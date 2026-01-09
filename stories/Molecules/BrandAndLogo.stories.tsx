import { BrandAndLogo } from '@/components/ui/brand'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: BrandAndLogo,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof BrandAndLogo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Horizontal: Story = {
  args: {
    className: 'flex flex-initial items-center gap-4',
    brandClassName: 'size-10'
  }
}

export const Home: Story = {
  args: {
    className: 'flex flex-col-reverse p-8 text-center',
    brandClassName:
      'translate-y-0 opacity-100 transition-all duration-750 starting:translate-y-4 starting:opacity-0',
    logoClassName:
      'text-brand select-none translate-y-0 text-6xl font-bold opacity-100 transition-all delay-300 duration-750 starting:translate-y-4 starting:opacity-0'
  }
}
