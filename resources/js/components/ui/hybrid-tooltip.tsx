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
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps
} from '@radix-ui/react-popover'
import {
  TooltipContentProps,
  TooltipProps,
  TooltipTriggerProps
} from '@radix-ui/react-tooltip'
import { useContext } from 'react'

export function HybridTooltip(props: TooltipProps & PopoverProps) {
  const { isTouch } = useContext(AppContext)

  return isTouch ? <Popover {...props} /> : <Tooltip {...props} />
}

export function HybridTooltipTrigger(
  props: TooltipTriggerProps & PopoverTriggerProps
) {
  const { isTouch } = useContext(AppContext)

  return isTouch ? <PopoverTrigger {...props} /> : <TooltipTrigger {...props} />
}

export function HybridTooltipContent({
  className,
  ...props
}: TooltipContentProps & PopoverContentProps) {
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
