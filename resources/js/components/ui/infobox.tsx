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
        error: 'border-error-foreground bg-error [&>svg]:text-error-foreground',
        info: 'border-info-foreground bg-info [&>svg]:text-info-foreground',
        success:
          'border-success-foreground bg-success [&>svg]:text-success-foreground',
        warning:
          'border-warning-foreground bg-warning [&>svg]:text-warning-foreground'
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
