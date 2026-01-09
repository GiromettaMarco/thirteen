import { Infobox } from '@/components/ui/infobox'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Infobox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['success', 'info', 'warning', 'error']
    }
  }
} satisfies Meta<typeof Infobox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p>
        If necessary, you may log out of all of your other browser sessions
        across all of your devices. This list may not be exhaustive. If you feel
        your account has been compromised, you should also update your password.
      </p>
    )
  }
}

export const Success: Story = {
  args: {
    children: <p>Your email address has been verified.</p>,
    variant: 'success'
  }
}

export const Info: Story = {
  args: {
    children: (
      <p>
        After submitting a new email address, you will need to verify it before
        proceeding further in the dashboard.
      </p>
    ),
    variant: 'info'
  }
}

export const Warning: Story = {
  args: {
    children: (
      <p>
        You don't have a "current team" yet. You can create new teams and set
        your current team in the Teams section.
      </p>
    ),
    variant: 'warning'
  }
}

export const Error: Story = {
  args: {
    children: <p>Please proceed with caution, this cannot be undone.</p>,
    variant: 'error'
  }
}
