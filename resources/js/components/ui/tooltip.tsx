import { cn } from '@gmcode/react-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { Tooltip as TooltipPrimitive } from 'radix-ui'
import * as React from 'react'

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        {...props}
      />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger
      className={cn(
        'rounded-md outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        className
      )}
      data-slot="tooltip-trigger"
      {...props}
    />
  )
}

const tooltipContentVariants = cva(
  'z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md px-3 py-1.5 text-xs text-balance fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  {
    defaultVariants: {
      variant: 'negative'
    },
    variants: {
      variant: {
        negative: 'bg-foreground text-background',
        popover: 'border bg-popover text-popover-foreground'
      }
    }
  }
)

function TooltipContent({
  children,
  className,
  sideOffset = 0,
  variant = 'negative',
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipContentVariants>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(tooltipContentVariants({ variant }), className)}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        {variant === 'negative' && (
          <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs bg-foreground fill-foreground" />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
