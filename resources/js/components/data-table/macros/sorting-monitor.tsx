import { cn } from '@gmcode/react-ui'
import type { ReactTable } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import type { Features, RowData } from '@/components/data-table/utility'

export function SortingMonitor<TData extends RowData>({
  className,
  table
}: {
  className?: string
  table: ReactTable<Features, TData>
}) {
  // i18n
  const { t } = useTranslation()

  const sorting = table.state.sorting

  return (
    <div
      className={cn('text-sm text-muted-foreground', className)}
      data-slot="sorting-monitor"
    >
      {sorting.length > 0 && (
        <span>
          {t(($) => $.table.sortingColon)}
          {sorting.map((columnSort, index) => (
            <span key={columnSort.id}>
              {table.getColumn(columnSort.id)?.columnDef.meta?.label}{' '}
              {columnSort.desc
                ? t(($) => $.table.sortingDesc)
                : t(($) => $.table.sortingAsc)}
              {index !== sorting.length - 1 && ' - '}
            </span>
          ))}
        </span>
      )}
    </div>
  )
}
