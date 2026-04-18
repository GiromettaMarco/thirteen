'use client'

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
import { cn } from '@/lib/utils'
import { AppContext } from '@/providers/app-context-provider'
import {
  Popover as PopoverPrimitive,
  Tooltip as TooltipPrimitive
} from 'radix-ui'
import { useContext } from 'react'

export function HybridTooltip(
  props: TooltipPrimitive.TooltipProps & PopoverPrimitive.PopoverProps
) {
  const { isTouch } = useContext(AppContext)

  return isTouch ? <Popover {...props} /> : <Tooltip {...props} />
}

export function HybridTooltipTrigger(
  props: TooltipPrimitive.TooltipTriggerProps &
    PopoverPrimitive.PopoverTriggerProps
) {
  const { isTouch } = useContext(AppContext)

  return isTouch ? <PopoverTrigger {...props} /> : <TooltipTrigger {...props} />
}

export function HybridTooltipContent({
  className,
  ...props
}: TooltipPrimitive.TooltipContentProps &
  PopoverPrimitive.PopoverContentProps) {
  const { isTouch } = useContext(AppContext)

  return isTouch ? (
    <PopoverContent
      className={cn('w-auto text-sm', className)}
      {...props}
    />
  ) : (
    <TooltipContent {...props} />
  )
}

export function HybridTooltipPreset({
  className,
  content,
  trigger
}: {
  className?: string
  content: string
  trigger: string
}) {
  return (
    <HybridTooltip>
      <HybridTooltipTrigger className={className}>
        {trigger}
      </HybridTooltipTrigger>
      <HybridTooltipContent>{content}</HybridTooltipContent>
    </HybridTooltip>
  )
}
