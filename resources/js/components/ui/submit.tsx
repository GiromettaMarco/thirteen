import { Button } from '@/components/ui/button'
import ButtonLoader from '@/components/ui/button-loader'

export function Submit({
  className,
  label,
  loading = false,
  type = 'submit',
  variant = 'default'
}: {
  className?: string
  label?: string
  loading?: boolean
  type?: 'reset' | 'submit' | 'button'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}) {
  return (
    <Button
      className={className}
      disabled={loading}
      type={type}
      variant={variant}
    >
      <ButtonLoader loading={loading}>{label}</ButtonLoader>
    </Button>
  )
}
