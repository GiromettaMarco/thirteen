import {
  Button,
  cn,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@gmcode/react-ui'
import type { ReactTable, RowData } from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Features } from '@/components/data-table/utility'

export function Pagination<TData extends RowData>({
  className,
  inputId = 'pagination',
  table
}: {
  className?: string
  inputId?: string
  table: ReactTable<Features, TData>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <div
      className={cn('flex items-center justify-between gap-8', className)}
      data-slot="table-pagination"
    >
      <div className="hidden items-center gap-2 lg:flex">
        <Label
          className="text-sm font-medium"
          htmlFor={inputId}
        >
          {t(($) => $.table.rowsPerPage)}
        </Label>

        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
          value={`${table.state.pagination.pageSize}`}
        >
          <SelectTrigger
            className="w-20"
            id={inputId}
            size="sm"
          >
            <SelectValue placeholder={table.state.pagination.pageSize} />
          </SelectTrigger>

          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-fit items-center justify-center text-sm font-medium">
        {t(($) => $.table.pageOf, {
          page: (table.state.pagination.pageIndex + 1).toString(),
          total: table.getPageCount().toString()
        })}
      </div>

      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          aria-label={t(($) => $.table.goToFirst)}
          className="hidden h-8 w-8 p-0 lg:flex"
          data-action="first-page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          variant="outline"
        >
          <ChevronsLeft />
        </Button>

        <Button
          aria-label={t(($) => $.table.goToPrevious)}
          className="size-8"
          data-action="previous-page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="icon"
          variant="outline"
        >
          <ChevronLeft />
        </Button>

        <Button
          aria-label={t(($) => $.table.goToNext)}
          className="size-8"
          data-action="next-page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="icon"
          variant="outline"
        >
          <ChevronRight />
        </Button>

        <Button
          aria-label={t(($) => $.table.goToLast)}
          className="hidden size-8 lg:flex"
          data-action="last-page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          size="icon"
          variant="outline"
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
