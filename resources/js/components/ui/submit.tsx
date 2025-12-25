import { Button } from '@/components/ui/button'
import ButtonLoader from '@/components/ui/button-loader'
import type { ComponentProps } from 'react'

export function Submit({
  label,
  loading = false,
  type = 'submit',
  ...props
}: ComponentProps<typeof Button> & {
  label?: string
  loading?: boolean
}) {
  return (
    <Button
      disabled={loading}
      type={type}
      {...props}
    >
      <ButtonLoader loading={loading}>{label}</ButtonLoader>
    </Button>
  )
}
