import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from '@/components/ui/heading'

const meta = {
  argTypes: {
    tag: {
      control: 'radio',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    },
    variant: {
      control: 'radio',
      options: ['default', 'small']
    }
  },
  component: Heading,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    h: 'Browser Sessions',
    p: 'Manage and log out your active sessions on other browsers and devices.'
  }
}

export const Small: Story = {
  args: {
    h: 'Browser Sessions',
    p: 'Manage and log out your active sessions on other browsers and devices.',
    tag: 'h4',
    variant: 'small'
  }
}
