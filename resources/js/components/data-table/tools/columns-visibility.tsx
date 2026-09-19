import { Button } from '@gmcode/react-ui'
import type { ReactTable } from '@tanstack/react-table'
import { ChevronDown, Columns2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DropdownSelection } from '@/components/data-table/components/dropdown-selection'
import type { Features, RowData } from '@/components/data-table/utility'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function ColumnsVisibility<TData extends RowData>({
  table
}: {
  table: ReactTable<Features, TData>
}) {
  // i18n
  const { t } = useTranslation()

  let visibleCount = 0
  const hidableColumns = table.getAllLeafColumns().filter((column) => {
    if (column.getCanHide()) {
      if (column.getIsVisible()) {
        visibleCount++
      }

      return true
    }

    return false
  })

  const allChecked =
    visibleCount === hidableColumns.length
      ? true
      : visibleCount === 0
        ? false
        : 'indeterminate'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-slot="columns-visibility"
          size="sm"
          variant="outline"
        >
          <Columns2 />
          <span>{t(($) => $.table.columns)}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownSelection
          checked={allChecked}
          data-action="toggle-all-columns-visibility"
          label={t(($) => $.table.allColumns)}
          onCheckedChange={(value) => table.toggleAllColumnsVisible(!!value)}
        />

        <DropdownMenuSeparator />

        {hidableColumns.map((column) => (
          <DropdownSelection
            checked={column.getIsVisible()}
            data-action={`toggle-${column.id}-visibility`}
            key={column.id}
            label={column.columnDef.meta?.label ?? column.id}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
