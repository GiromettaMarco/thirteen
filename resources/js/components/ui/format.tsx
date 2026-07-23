import { cn } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'
import { Heading } from '@/components/ui/heading'

export function Format({
  children,
  className,
  h2,
  p,
  ...props
}: ComponentProps<'div'> & {
  h2: string
  p?: string
}) {
  return (
    <section
      className={cn(
        'grid gap-3 md:gap-6 lg:grid-cols-8 2xl:grid-cols-12',
        className
      )}
      {...props}
    >
      <Heading
        className="lg:col-span-3 2xl:col-start-2"
        h={h2}
        p={p}
        variant="small"
      />

      <div className="space-y-3 lg:col-span-5">{children}</div>
    </section>
  )
}
