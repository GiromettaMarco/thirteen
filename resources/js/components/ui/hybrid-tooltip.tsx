'use client'

import { cn } from '@gmcode/react-ui'
import type { PropsWithChildren, ReactNode } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useIsTouch } from '@/hooks/use-touch'

export function HybridTooltip({
  asChild,
  children,
  contentClassName,
  trigger,
  triggerClassName
}: PropsWithChildren<{
  asChild?: boolean
  contentClassName?: string
  trigger: ReactNode
  triggerClassName?: string
}>) {
  const isTouch = useIsTouch()

  if (isTouch) {
    return (
      <Popover>
        <PopoverTrigger
          asChild={asChild}
          className={triggerClassName}
        >
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-auto px-4 py-2.5 text-sm', contentClassName)}
        >
          {children}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger
        asChild={asChild}
        className={triggerClassName}
      >
        {trigger}
      </TooltipTrigger>
      <TooltipContent
        className={cn('px-4 py-2.5', contentClassName)}
        variant="popover"
      >
        {children}
      </TooltipContent>
    </Tooltip>
  )
}
