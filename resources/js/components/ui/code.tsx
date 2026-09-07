import { cn } from '@gmcode/react-ui'
import type { PropsWithChildren } from 'react'

export function Code({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <code
      className={cn(
        'rounded bg-code px-1.5 py-0.5 text-code-foreground',
        className
      )}
    >
      {children}
    </code>
  )
}
