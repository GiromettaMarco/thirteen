import type { Column } from '@tanstack/react-table'
import { ColumnSorting } from '@/components/data-table/components/column-sorting'
import { DefinedFilter } from '@/components/data-table/filters/defined-filter'
import { SearchFilter } from '@/components/data-table/filters/search-filter'
import type { Features, RowData } from '@/components/data-table/utility'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function ColumnHeader<TData extends RowData, TValue>({
  column,
  filter,
  sorting = false,
  tooltip
}: {
  column: Column<Features, TData, TValue>
  filter?: 'defined' | 'search'
  sorting?: boolean
  tooltip?: string
}) {
  return (
    <div className="flex items-center gap-1">
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger className="rounded-md outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
            {column.columnDef.meta?.label}
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        <div>{column.columnDef.meta?.label}</div>
      )}
      <div className="flex items-center">
        {sorting && <ColumnSorting column={column} />}
        {filter === 'defined' && <DefinedFilter column={column} />}
        {filter === 'search' && <SearchFilter column={column} />}
      </div>
    </div>
  )
}
