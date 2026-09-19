import { cn, type CheckedState } from '@gmcode/react-ui'
import type { FC, SVGProps } from 'react'
import { useTranslation } from 'react-i18next'
import { DropdownMenuCheckboxElement } from '@/components/ui/dropdown-menu'

export function DropdownSelection({
  checked,
  'data-action': dataAction,
  empty,
  Icon,
  label,
  onCheckedChange,
  quantity
}: {
  checked?: CheckedState
  'data-action'?: string
  empty?: boolean
  Icon?: FC<SVGProps<SVGSVGElement>>
  label?: string
  onCheckedChange?: (checked: boolean) => void
  quantity?: string | number
}) {
  // i18n
  const { t } = useTranslation()

  const isEmpty = empty || label === undefined

  return (
    <DropdownMenuCheckboxElement
      checked={checked}
      data-action={dataAction}
      onCheckedChange={onCheckedChange}
      onSelect={(event) => event.preventDefault()}
    >
      <div className="flex w-full items-center gap-2">
        {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}

        <span className={cn({ 'text-muted-foreground': isEmpty })}>
          {isEmpty ? t(($) => $.table.emptyFilter) : label}
        </span>

        {quantity && (
          <span className="ml-auto font-mono text-xs">{quantity}</span>
        )}
      </div>
    </DropdownMenuCheckboxElement>
  )
}
