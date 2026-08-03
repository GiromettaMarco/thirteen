import { cn } from '@gmcode/react-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'

const headingVariants = cva(undefined, {
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'text-xl font-semibold',
      small: 'mb-0.5 text-base font-medium'
    }
  }
})

export function Heading({
  customDescription,
  h,
  p,
  tag: Tag = 'h2',
  variant = 'default',
  ...props
}: ComponentProps<'header'> &
  VariantProps<typeof headingVariants> & {
    customDescription?: ReactNode
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
      {customDescription}
    </header>
  )
}
