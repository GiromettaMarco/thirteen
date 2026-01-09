import { TextLink } from '@/components/text-link'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: TextLink,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    className: { type: 'string' },
    children: { type: 'string' },
    href: { type: 'string' }
  }
} satisfies Meta<typeof TextLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Forgot your password?',
    href: '/forgot-password'
  }
}
