import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextLink } from '@/components/text-link'

const meta = {
  argTypes: {
    children: { type: 'string' },
    className: { type: 'string' },
    href: { type: 'string' }
  },
  component: TextLink,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof TextLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Forgot your password?',
    href: '/forgot-password'
  }
}
