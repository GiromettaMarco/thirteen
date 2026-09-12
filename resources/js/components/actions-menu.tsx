import { Button, cn } from '@gmcode/react-ui'
import type { UrlMethodPair } from '@inertiajs/core'
import { Link } from '@inertiajs/react'
import { EllipsisVertical } from 'lucide-react'
import type {
  ComponentProps,
  MouseEventHandler,
  PropsWithChildren
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export type ActionVariant = 'default' | 'destructive'

export interface ActionProps {
  href?: string | UrlMethodPair
  label?: string
  name: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: ActionVariant
}

export function ActionsButton({
  'aria-label': ariaLabel,
  className,
  size = 'icon',
  variant = 'ghost',
  ...props
}: ComponentProps<typeof Button>) {
  // i18n
  const { t } = useTranslation()

  return (
    <DropdownMenuTrigger asChild>
      <Button
        aria-label={ariaLabel ?? t(($) => $.openActions)}
        className={cn(
          'size-8 text-muted-foreground data-[state=open]:bg-muted',
          className
        )}
        data-action="open-actions"
        size={size}
        variant={variant}
        {...props}
      >
        <EllipsisVertical />
      </Button>
    </DropdownMenuTrigger>
  )
}

export function ActionItem({
  children,
  href,
  label,
  name,
  onClick,
  variant
}: PropsWithChildren<ActionProps>) {
  if (href) {
    return (
      <DropdownMenuItem
        asChild
        data-action={name}
        variant={variant}
      >
        <Link href={href}>{children ?? label}</Link>
      </DropdownMenuItem>
    )
  }

  if (onClick) {
    return (
      <DropdownMenuItem
        asChild
        variant={variant}
      >
        <button
          className="w-full"
          data-action={name}
          onClick={onClick}
          type="button"
        >
          {children ?? label}
        </button>
      </DropdownMenuItem>
    )
  }

  return null
}

export function ActionsMenu({
  actions,
  'aria-label': ariaLabel,
  secondary
}: {
  actions: ActionProps[]
  'aria-label'?: string
  secondary?: ActionProps[]
}) {
  return (
    <DropdownMenu>
      <ActionsButton aria-label={ariaLabel} />
      <ActionsMenuContent
        actions={actions}
        secondary={secondary}
      />
    </DropdownMenu>
  )
}

export function ActionsMenuContent({
  actions,
  secondary
}: {
  actions: ActionProps[]
  secondary?: ActionProps[]
}) {
  return (
    <DropdownMenuContent
      align="end"
      className="w-32"
    >
      {actions.map((action) => (
        <ActionItem
          href={action.href}
          key={action.name}
          label={action.label}
          name={action.name}
          onClick={action.onClick}
          variant={action.variant}
        />
      ))}

      {secondary && secondary.length > 0 && (
        <>
          <DropdownMenuSeparator />
          {secondary.map((action) => (
            <ActionItem
              href={action.href}
              key={action.name}
              label={action.label}
              name={action.name}
              onClick={action.onClick}
              variant={action.variant}
            />
          ))}
        </>
      )}
    </DropdownMenuContent>
  )
}
