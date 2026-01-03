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
  description,
  Tag = 'h2',
  title,
  variant = 'default',
  ...props
}: ComponentProps<'header'> &
  VariantProps<typeof headingVariants> & {
    description?: string
    Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    title: string
  }) {
  return (
    <header {...props}>
      <Tag
        className={cn(headingVariants({ variant }))}
        data-variant={variant}
      >
        {title}
      </Tag>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </header>
  )
}
