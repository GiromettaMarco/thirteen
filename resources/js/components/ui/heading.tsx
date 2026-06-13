import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

const headingVariants = cva(undefined, {
  variants: {
    variant: {
      default: 'text-xl font-semibold',
      small: 'mb-0.5 text-base font-medium'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export function Heading({
  h,
  p,
  tag: Tag = 'h2',
  variant = 'default',
  ...props
}: ComponentProps<'header'> &
  VariantProps<typeof headingVariants> & {
    h: string
    p?: string
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }) {
  return (
    <header {...props}>
      <Tag
        className={cn(headingVariants({ variant }))}
        data-variant={variant}
      >
        {h}
      </Tag>
      {p && <p className="text-sm text-muted-foreground">{p}</p>}
    </header>
  )
}
