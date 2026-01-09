import { Format } from '@/components/ui/format'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Format,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Format>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="text-sm space-y-2">
        <p>
          If necessary, you may log out of all of your other browser sessions
          across all of your devices. This list may not be exhaustive. If you
          feel your account has been compromised, you should also update your
          password.
        </p>
        <p>
          Please enter your password to confirm you would like to log out of
          your other browser sessions across all of your devices.
        </p>
      </div>
    ),
    h2: 'Update password',
    p: 'Change the password of your account'
  }
}
