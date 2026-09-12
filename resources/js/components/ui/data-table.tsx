import { Badge } from '@/components/ui/badge'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import {
  Button,
  Checkbox,
  cn,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator
} from '@gmcode/react-ui'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

// @NOTE 'use no memo' is required due to incompatibility between Tanstack and React Compiler.

//#region SelectionMonitor
export function SelectionMonitor<TData>({
  className,
  table
}: {
  className?: string
  table: TanstackTable<TData>
}) {
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'hidden flex-1 text-sm text-muted-foreground lg:flex',
        className
      )}
    >
      {t(($) => $.table.selectedRows, {
        count: table.getFilteredSelectedRowModel().rows.length,
        total: table.getFilteredRowModel().rows.length.toString()
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
    <div className={cn('text-sm text-muted-foreground', className)}>
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
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <div className={cn('flex w-full items-center gap-8 lg:w-fit', className)}>
      <div className="hidden items-center gap-2 lg:flex">
        <Label
          className="text-sm font-medium"
          htmlFor="rows-per-page"
        >
          {t(($) => $.table.rowsPerPage)}
        </Label>

        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger
            className="w-20"
            id="rows-per-page"
            size="sm"
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
          page: (table.getState().pagination.pageIndex + 1).toString(),
          total: table.getPageCount().toString()
        })}
      </div>

      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          className="hidden h-8 w-8 p-0 lg:flex"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          variant="outline"
        >
          <span className="sr-only">{t(($) => $.table.goToFirst)}</span>
          <ChevronsLeft />
        </Button>

        <Button
          className="size-8"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="icon"
          variant="outline"
        >
          <span className="sr-only">{t(($) => $.table.goToPrevious)}</span>
          <ChevronLeft />
        </Button>

        <Button
          className="size-8"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="icon"
          variant="outline"
        >
          <span className="sr-only">{t(($) => $.table.goToNext)}</span>
          <ChevronRight />
        </Button>

        <Button
          className="hidden size-8 lg:flex"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          size="icon"
          variant="outline"
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
          'flex flex-col gap-2 @5xl/main:flex-row-reverse @5xl/main:items-center @5xl/main:justify-between',
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
          'flex flex-col gap-2 @5xl/main:flex-row-reverse @5xl/main:items-center @5xl/main:justify-between',
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
      <div className="flex flex-col gap-2 @5xl/main:flex-row-reverse @5xl/main:items-center @5xl/main:justify-between">
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
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
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
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                checked={column.getIsVisible()}
                key={column.id}
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
  options: {
    icon?: React.ComponentType<{ className?: string }>
    label: string
    value: string
  }[]
  title?: string
}

export function FacetedFilter<TData, TValue>({
  column,
  options,
  title
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
            className="h-8"
            size="sm"
            variant="outline"
          >
            <PlusCircle />

            {title}

            {selectedValues?.size > 0 && (
              <>
                <Separator
                  className="mx-2 h-4"
                  orientation="vertical"
                />

                <Badge
                  className="rounded-sm px-1 font-normal 2xl:hidden"
                  variant="secondary"
                >
                  {selectedValues.size}
                </Badge>

                <div className="hidden space-x-1 2xl:flex">
                  {selectedValues.size > 2 ? (
                    <Badge
                      className="rounded-sm px-1 font-normal"
                      variant="secondary"
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
                          className="rounded-sm px-1 font-normal"
                          key={option.value ?? 'none'}
                          variant="secondary"
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
          align="start"
          className="w-50 p-0"
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
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <Check className="text-primary-foreground" />
                      </div>

                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
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
                      className="justify-center text-center"
                      onSelect={() => column?.setFilterValue(undefined)}
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
function SortableColumnIcon<TData, TValue>({
  column
}: {
  column: Column<TData, TValue>
}) {
  switch (column.getIsSorted()) {
    case 'asc':
      return <ArrowUp />

    case 'desc':
      return <ArrowDown />

    default:
      return <ChevronsUpDown />
  }
}

export function SortableColumnHeader<TData, TValue>({
  className,
  column,
  title,
  tooltip
}: {
  className?: string
  column: Column<TData, TValue>
  title: string
  tooltip?: string
}) {
  'use no memo'

  // i18n
  const { t } = useTranslation()

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('-mx-1.5', className)}>
      <DropdownMenu>
        {tooltip ? (
          <Tooltip>
            <TooltipTrigger
              asChild
              className="rounded-md outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-8 has-[>svg]:px-1.5"
                  size="sm"
                  variant="ghost"
                >
                  <span>{title}</span>
                  <SortableColumnIcon column={column} />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        ) : (
          <DropdownMenuTrigger asChild>
            <Button
              className="h-8 has-[>svg]:px-1.5"
              size="sm"
              variant="ghost"
            >
              <span>{title}</span>
              <SortableColumnIcon column={column} />
            </Button>
          </DropdownMenuTrigger>
        )}

        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false, true)}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t(($) => $.table.Asc)}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => column.toggleSorting(true, true)}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t(($) => $.table.Desc)}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <X className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t(($) => $.actions.reset)}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

//#region TableMain
export default function TableMain<TData>({
  id,
  table
}: {
  id?: string
  table: TanstackTable<TData>
}) {
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden rounded-md border">
      <Table id={id}>
        <TableHeader className="sticky top-0 z-10 bg-muted">
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
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
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

//#region TableSelect
export function SelectHeader<T extends object>({
  table
}: {
  table: TanstackTable<T>
}) {
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <Checkbox
      aria-label={t(($) => $.table.selectAll)}
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      className="translate-y-0.5"
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    />
  )
}

export function SelectCell<T extends object>({ row }: { row: Row<T> }) {
  'use no memo'

  // i18n
  const { t } = useTranslation()

  return (
    <Checkbox
      aria-label={t(($) => $.table.selectRow)}
      checked={row.getIsSelected()}
      className="translate-y-0.5"
      onCheckedChange={(value) => row.toggleSelected(!!value)}
    />
  )
}

export function getSelectColDef<T extends object>() {
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
  'use no memo'

  // i18n
  const { t } = useTranslation()

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className={cn('grid items-center gap-2 @5xl/main:flex', className)}>
      <Input
        className="h-8 w-full 2xl:w-64"
        onChange={(event) =>
          table.getColumn(columnId)?.setFilterValue(event.target.value)
        }
        placeholder={t(($) => $.table.searchByName)}
        value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ''}
      />

      {(isFiltered || children) && (
        <div className="flex items-center gap-2">
          {children}

          {isFiltered && (
            <Button
              className="h-8 px-2 lg:px-3"
              onClick={() => table.resetColumnFilters()}
              variant="ghost"
            >
              {t(($) => $.actions.reset)}
              <X />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
