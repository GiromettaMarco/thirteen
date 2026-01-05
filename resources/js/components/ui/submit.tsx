import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
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
      <div className="relative">
        <span className={cn({ invisible: loading })}>{label}</span>
        <Spinner
          className={cn(
            'trans absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2',
            { block: loading }
          )}
        />
      </div>
    </Button>
  )
}
