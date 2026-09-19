import type { ReactTable } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import type { Features, RowData } from '@/components/data-table/utility'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export function TableMain<TData extends RowData>({
  id,
  table
}: {
  id?: string
  table: ReactTable<Features, TData>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <div className="grid overflow-hidden rounded-md border">
      <Table id={id}>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {!header.isPlaceholder && (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-selected={row.getIsSelected() || undefined}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="h-24 text-center"
                colSpan={table.getAllColumns().length}
              >
                {t(($) => $.table.noResults)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
