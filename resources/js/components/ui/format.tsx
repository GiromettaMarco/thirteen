import { Heading } from '@/components/ui/heading'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export function Format({
  children,
  className,
  description,
  title,
  ...props
}: ComponentProps<'div'> & {
  description?: string
  title: string
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
        description={description}
        title={title}
        variant="small"
      />

      <div className="space-y-3 lg:col-span-5">{children}</div>
    </section>
  )
}
