import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export function Container({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('container mx-auto px-4 lg:px-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}
