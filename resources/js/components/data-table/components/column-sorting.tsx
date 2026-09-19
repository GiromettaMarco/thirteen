import { Button } from '@gmcode/react-ui'
import type { Column, SortDirection } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Features, RowData } from '@/components/data-table/utility'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function ColumnSorting<TData extends RowData, TValue>({
  column
}: {
  column: Column<Features, TData, TValue>
}) {
  // i18n
  const { t } = useTranslation()

  const [direction, setDirection] = useState<false | SortDirection>(() =>
    column.getIsSorted()
  )

  function sort(dir: false | SortDirection) {
    switch (dir) {
      case 'asc':
        column.toggleSorting(false, true)
        setDirection('asc')
        break

      case 'desc':
        column.toggleSorting(true, true)
        setDirection('desc')
        break

      default:
        column.clearSorting()
        setDirection(false)
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t(($) => $.table.sorting)}
          data-action={`sort-${column.id}`}
          size="icon-sm"
          variant="ghost"
        >
          {direction === 'asc' && <ArrowUp />}
          {direction === 'desc' && <ArrowDown />}
          {direction === false && <ChevronsUpDown />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <button
            className="w-full"
            data-action="sort-ascending"
            onClick={() => sort('asc')}
            type="button"
          >
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t(($) => $.table.Asc)}
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <button
            className="w-full"
            data-action="sort-descending"
            onClick={() => sort('desc')}
            type="button"
          >
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t(($) => $.table.Desc)}
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button
            className="w-full"
            data-action="remove-sorting"
            onClick={() => sort(false)}
            type="button"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t(($) => $.actions.reset)}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
