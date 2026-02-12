import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  flexRender,
  type Column,
  type Row,
  type SortingState,
  type Table as TanstackTable
} from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Columns2,
  PlusCircle,
  X
} from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

//#region SelectionMonitor
export function SelectionMonitor<TData>({
  className,
  table
}: {
  className?: string
  table: TanstackTable<TData>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'text-muted-foreground hidden flex-1 text-sm lg:flex',
        className
      )}
    >
      {t(($) => $.table.selectedRows, {
        count: table.getFilteredSelectedRowModel().rows.length,
        total: table.getFilteredRowModel().rows.length
      })}
    </div>
  )
}

//#region SortingMonitor
export function SortingMonitor({
  className,
  labels,
  sorting
}: {
  className?: string
  labels?: Record<string, string>
  sorting: SortingState
}) {
  // i18n
  const { t } = useTranslation()

  if (sorting.length === 0) {
    return null
  }

  return (
    <div className={cn('text-muted-foreground text-sm', className)}>
      {t(($) => $.table.sorting) + ': '}
      {sorting.map((column, index) => (
        <span key={column.id}>
          {labels ? (labels[column.id] ?? column.id) : column.id}
          {' (' +
            (column.desc ? t(($) => $.table.desc) : t(($) => $.table.asc)) +
            ')'}
          {index !== sorting.length - 1 && ' - '}
        </span>
      ))}
    </div>
  )
}

//#region TablePagination
export function TablePagination<TData>({
  className,
  table
}: {
  className?: string
  table: TanstackTable<TData>
}) {
  // @NOTE prevent this function from being optimized by React Compiler.
  // @see https://github.com/TanStack/table/issues/5567
  // @see https://github.com/TanStack/table/discussions/5834
  // @see https://github.com/TanStack/table/discussions/5595
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <div className={cn('flex w-full items-center gap-8 lg:w-fit', className)}>
      <div className="hidden items-center gap-2 lg:flex">
        <Label
          htmlFor="rows-per-page"
          className="text-sm font-medium"
        >
          {t(($) => $.table.rowsPerPage)}
        </Label>

        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger
            size="sm"
            className="w-20"
            id="rows-per-page"
          >
            <SelectValue placeholder={table.getState().pagination.pageSize} />
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
          page: table.getState().pagination.pageIndex + 1,
          total: table.getPageCount()
        })}
      </div>

      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">{t(($) => $.table.goToFirst)}</span>
          <ChevronsLeft />
        </Button>

        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">{t(($) => $.table.goToPrevious)}</span>
          <ChevronLeft />
        </Button>

        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">{t(($) => $.table.goToNext)}</span>
          <ChevronRight />
        </Button>

        <Button
          variant="outline"
          className="hidden size-8 lg:flex"
          size="icon"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">{t(($) => $.table.goToLast)}</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}

//#region AfterTable
export function AfterTable<TData>({
  className,
  pagination = true,
  selection = true,
  sorting = true,
  sortingLabels,
  sortingState = [],
  table
}: {
  className?: string
  pagination?: boolean
  selection?: boolean
  sorting?: boolean
  sortingLabels?: Record<string, string>
  sortingState?: SortingState
  table: TanstackTable<TData>
}) {
  // @NOTE prevent this function from being optimized by React Compiler.
  // @see https://github.com/TanStack/table/issues/5567
  // @see https://github.com/TanStack/table/discussions/5834
  // @see https://github.com/TanStack/table/discussions/5595
  'use no memo'

  // No pagination
  if (!pagination) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {selection && <SelectionMonitor table={table} />}

        {sorting && (
          <SortingMonitor
            labels={sortingLabels}
            sorting={sortingState}
          />
        )}
      </div>
    )
  }

  // No selection
  if (!selection) {
    return (
      <div
        className={cn(
          'flex flex-col gap-2 xl:flex-row-reverse xl:items-center xl:justify-between',
          className
        )}
      >
        <TablePagination table={table} />

        {sorting && (
          <SortingMonitor
            labels={sortingLabels}
            sorting={sortingState}
          />
        )}
      </div>
    )
  }

  // No sorting
  if (!sorting) {
    return (
      <div
        className={cn(
          'flex flex-col gap-2 xl:flex-row-reverse xl:items-center xl:justify-between',
          className
        )}
      >
        <TablePagination table={table} />

        {selection && <SelectionMonitor table={table} />}
      </div>
    )
  }

  // All
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex flex-col gap-2 xl:flex-row-reverse xl:items-center xl:justify-between">
        <TablePagination table={table} />

        <SelectionMonitor table={table} />
      </div>

      <SortingMonitor
        labels={sortingLabels}
        sorting={sortingState}
      />
    </div>
  )
}

//#region ColumnsVisibility
export function ColumnsVisibility<TData>({
  labels,
  table
}: {
  labels?: Record<string, string>
  table: TanstackTable<TData>
}) {
  // @NOTE prevent this function from being optimized by React Compiler.
  // @see https://github.com/TanStack/table/issues/5567
  // @see https://github.com/TanStack/table/discussions/5834
  // @see https://github.com/TanStack/table/discussions/5595
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
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
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {labels ? (labels[column.id] ?? column.id) : column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

//#region FacetedFilter
interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function FacetedFilter<TData, TValue>({
  column,
  title,
  options
}: FacetedFilterProps<TData, TValue>) {
  // i18n
  const { t } = useTranslation()

  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
          >
            <PlusCircle />

            {title}

            {selectedValues?.size > 0 && (
              <>
                <Separator
                  orientation="vertical"
                  className="mx-2 h-4"
                />

                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal 2xl:hidden"
                >
                  {selectedValues.size}
                </Badge>

                <div className="hidden space-x-1 2xl:flex">
                  {selectedValues.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {t(($) => $.table.filterSelected, {
                        count: selectedValues.size
                      })}
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value ?? 'none'}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-50 p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={title} />

            <CommandList>
              <CommandEmpty>{t(($) => $.table.noResults)}</CommandEmpty>

              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value)

                  return (
                    <CommandItem
                      key={option.value ?? 'none'}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value)
                        } else {
                          selectedValues.add(option.value)
                        }

                        const filterValues = Array.from(selectedValues)
                        column?.setFilterValue(
                          filterValues.length ? filterValues : undefined
                        )
                      }}
                    >
                      <div
                        className={cn(
                          'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <Check />
                      </div>

                      {option.icon && (
                        <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                      )}

                      <span>{option.label}</span>

                      {facets?.get(option.value) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {facets.get(option.value)}
                        </span>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>

              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />

                  <CommandGroup>
                    <CommandItem
                      onSelect={() => column?.setFilterValue(undefined)}
                      className="justify-center text-center"
                    >
                      {t(($) => $.table.clearFilters)}
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

//#region SortableColumnHeader
interface SortableColumnHeaderProps<
  TData,
  TValue
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function SortableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: SortableColumnHeaderProps<TData, TValue>) {
  // i18n
  const { t } = useTranslation()

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-8 has-[>svg]:px-1.5"
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>

            {column.getIsSorted() === 'desc' ? (
              <ArrowDown />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false, true)}>
            <ArrowUp className="text-muted-foreground/70 h-3.5 w-3.5" />
            {t(($) => $.table.Asc)}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => column.toggleSorting(true, true)}>
            <ArrowDown className="text-muted-foreground/70 h-3.5 w-3.5" />
            {t(($) => $.table.Desc)}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <X className="text-muted-foreground/70 h-3.5 w-3.5" />
            {t(($) => $.reset)}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

//#region TableMain
export default function TableMain<TData>({
  table
}: {
  table: TanstackTable<TData>
}) {
  // @NOTE prevent this function from being optimized by React Compiler.
  // @see https://github.com/TanStack/table/issues/5567
  // @see https://github.com/TanStack/table/discussions/5834
  // @see https://github.com/TanStack/table/discussions/5595
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
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

//#region TableSelect
export function SelectHeader<T extends object>({
  table
}: {
  table: TanstackTable<T>
}) {
  // @NOTE prevent this function from being optimized by React Compiler.
  // @see https://github.com/TanStack/table/issues/5567
  // @see https://github.com/TanStack/table/discussions/5834
  // @see https://github.com/TanStack/table/discussions/5595
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      className="translate-y-0.5"
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label={t(($) => $.table.selectAll)}
    />
  )
}

export function SelectCell<T extends object>({ row }: { row: Row<T> }) {
  // @NOTE prevent this function from being optimized by React Compiler.
  // @see https://github.com/TanStack/table/issues/5567
  // @see https://github.com/TanStack/table/discussions/5834
  // @see https://github.com/TanStack/table/discussions/5595
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <Checkbox
      checked={row.getIsSelected()}
      className="translate-y-0.5"
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label={t(($) => $.table.selectRow)}
    />
  )
}

export function getSelectColDef<T extends object>() {
  // @NOTE prevent this function from being optimized by React Compiler.
  // @see https://github.com/TanStack/table/issues/5567
  // @see https://github.com/TanStack/table/discussions/5834
  // @see https://github.com/TanStack/table/discussions/5595
  'use no memo'

  return {
    cell: ({ row }: { row: Row<T> }) => <SelectCell row={row} />,
    enableHiding: false,
    enableSorting: false,
    header: ({ table }: { table: TanstackTable<T> }) => (
      <SelectHeader table={table} />
    ),
    id: 'select'
  }
}

//#region TableToolbar
export function TableToolbar<TData>({
  children,
  className,
  columnId = 'name',
  table
}: PropsWithChildren<{
  className?: string
  columnId?: string
  table: TanstackTable<TData>
}>) {
  // @NOTE prevent this function from being optimized by React Compiler.
  // @see https://github.com/TanStack/table/issues/5567
  // @see https://github.com/TanStack/table/discussions/5834
  // @see https://github.com/TanStack/table/discussions/5595
  'use no memo'

  // i18n
  const { t } = useTranslation()

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className={cn('grid items-center gap-2 xl:flex', className)}>
      <Input
        placeholder={t(($) => $.table.searchByName)}
        value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn(columnId)?.setFilterValue(event.target.value)
        }
        className="h-8 w-full 2xl:w-64"
      />

      {(isFiltered || children) && (
        <div className="flex items-center gap-2">
          {children}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              {t(($) => $.reset)}
              <X />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
