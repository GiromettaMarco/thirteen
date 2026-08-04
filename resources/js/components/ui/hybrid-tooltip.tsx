'use client'

import { cn } from '@gmcode/react-ui'
import { useContext, type ComponentProps } from 'react'
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
import { AppContext } from '@/providers/app-context-provider'

export function HybridTooltip(
  props: ComponentProps<typeof Popover> & ComponentProps<typeof Tooltip>
) {
  const { isTouch } = useContext(AppContext)

  return isTouch ? <Popover {...props} /> : <Tooltip {...props} />
}

export function HybridTooltipTrigger(
  props: ComponentProps<typeof PopoverTrigger> &
    ComponentProps<typeof TooltipTrigger>
) {
  const { isTouch } = useContext(AppContext)

  return isTouch ? <PopoverTrigger {...props} /> : <TooltipTrigger {...props} />
}

export function HybridTooltipContent({
  className,
  ...props
}: ComponentProps<typeof PopoverContent> &
  ComponentProps<typeof TooltipContent>) {
  const { isTouch } = useContext(AppContext)

  return isTouch ? (
    <PopoverContent
      className={cn('w-auto text-sm', className)}
      {...props}
    />
  ) : (
    <TooltipContent
      className={className}
      {...props}
    />
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
