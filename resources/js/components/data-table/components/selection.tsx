import { Checkbox } from '@gmcode/react-ui'
import type { Row, Table } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import type { Features, RowData } from '@/components/data-table/utility'

export function SelectionHeader<TData extends RowData>({
  table
}: {
  table: Table<Features, TData>
}) {
  // i18n
  const { t } = useTranslation()

  // @NOTE getIsSomeRowsSelected returns `true` when all rows are selected.
  const checked = table.getIsSomeRowsSelected()
    ? table.getIsAllRowsSelected()
      ? true
      : 'indeterminate'
    : false

  return (
    <div className="flex items-center">
      <Checkbox
        aria-label={t(($) => $.table.selectAll)}
        checked={checked}
        data-action="select-all-rows"
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    </div>
  )
}

export function SelectionRow<TData extends RowData>({
  row
}: {
  row: Row<Features, TData>
}) {
  // i18n
  const { t } = useTranslation()

  // @NOTE getIsSomeSelected returns `false` when the row is selected but there are no cells selected.
  const checked = row.getIsSelected()
    ? true
    : row.getIsSomeSelected()
      ? 'indeterminate'
      : false

  return (
    <div className="flex items-center">
      <Checkbox
        aria-label={t(($) => $.table.selectRow)}
        checked={checked}
        data-action="select-row"
        disabled={!row.getCanSelect()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    </div>
  )
}
