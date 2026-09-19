import { cn } from '@gmcode/react-ui'
import type { ReactTable } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import type { Features, RowData } from '@/components/data-table/utility'

export function SelectionMonitor<TData extends RowData>({
  className,
  table
}: {
  className?: string
  table: ReactTable<Features, TData>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <div
      className={cn('flex text-sm text-muted-foreground', className)}
      data-slot="selection-monitor"
    >
      {t(($) => $.table.selectedRows, {
        count: table.getSelectedRowIds().length,
        total: table.getRowCount()
      })}
    </div>
  )
}
