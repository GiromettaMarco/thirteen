import type { ReactTable } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { ColumnsVisibility } from '@/components/data-table/tools/columns-visibility'
import type { Features, RowData } from '@/components/data-table/utility'

export function Toolbar<TData extends RowData>({
  actions,
  table,
  visibility = true
}: {
  actions?: (table: ReactTable<Features, TData>) => ReactNode
  table: ReactTable<Features, TData>
  visibility?: boolean
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      data-slot="table-toolbar"
    >
      {actions && actions(table)}
      {visibility && <ColumnsVisibility table={table} />}
    </div>
  )
}
