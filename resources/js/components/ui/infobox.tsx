import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon
} from 'lucide-react'
import type { ComponentProps, FC, SVGProps } from 'react'

const Icons = {
  error: OctagonXIcon,
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon
} satisfies Record<string, FC<SVGProps<SVGSVGElement>>>

const boxVariants = cva(
  'grid grid-cols-[calc(var(--spacing)*4)_1fr] items-start gap-3 rounded-lg border-s-[0.375rem] p-3 text-sm',
  {
    variants: {
      variant: {
        error: 'border-error bg-error/10 [&>svg]:text-error',
        info: 'border-info bg-info/10 [&>svg]:text-info',
        success: 'border-success bg-success/10 [&>svg]:text-success',
        warning: 'border-warning bg-warning/10 [&>svg]:text-warning'
      }
    },
    defaultVariants: {
      variant: 'info'
    }
  }
)

export function Infobox({
  children,
  className,
  iconClassName,
  variant,
  ...props
}: VariantProps<typeof boxVariants> &
  ComponentProps<'div'> & {
    iconClassName?: string
  }) {
  const Icon = Icons[variant ?? 'info']

  return (
    <div
      className={cn(boxVariants({ variant }), className)}
      {...props}
    >
      <Icon className={cn('size-4 translate-y-0.5', iconClassName)} />
      <div>{children}</div>
    </div>
  )
}
