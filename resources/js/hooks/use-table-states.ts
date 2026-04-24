import { viewDefaults } from '@/lib/utils'
import { store } from '@/routes/views'
import type { View, ViewStore } from '@/types'
import type {
  ColumnFiltersState,
  PaginationState,
  RowData,
  SortingState,
  Updater,
  VisibilityState
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

export default function UseTableStates<TData extends RowData>({
  data: initialData,
  view,
  viewStore
}: {
  data: TData[]
  view?: View
  viewStore?: ViewStore
}) {
  // Table data
  const [data, setData] = useState<TData[]>(() => initialData)

  // Column filters
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    () => view?.filters ?? viewDefaults.filters
  )

  /**
   * Update column filters state and save it in the database.
   *
   * "name" column filter doesn't concur for db state calculation.
   */
  const onColumnFiltersChange = useMemo(
    () => (updater: Updater<ColumnFiltersState>) => {
      if (viewStore) {
        const newFilters =
          updater instanceof Function ? updater(columnFilters) : updater
        const newFiltersWithoutName: ColumnFiltersState = []

        for (const columnFilter of newFilters) {
          if (columnFilter.id !== 'name') {
            newFiltersWithoutName.push(columnFilter)
          }
        }

        let oldFiltersSizeWithoutName = 0
        for (const columnFilter of columnFilters) {
          if (columnFilter.id !== 'name') {
            oldFiltersSizeWithoutName++
          }
        }

        if (newFiltersWithoutName.length !== oldFiltersSizeWithoutName) {
          axios.post(store().url, {
            filters: JSON.stringify(newFiltersWithoutName),
            ...viewStore
          })
        }
      }

      setColumnFilters(updater)
    },
    [columnFilters, viewStore]
  )

  // Columns visibility
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => view?.visibility ?? viewDefaults.visibility
  )

  /**
   * Update column visibility state and save it in the database.
   */
  const onColumnVisibilityChange = useMemo(
    () => (updater: Updater<VisibilityState>) => {
      if (viewStore) {
        axios.post(store().url, {
          visibility: JSON.stringify(
            updater instanceof Function ? updater(columnVisibility) : updater
          ),
          ...viewStore
        })
      }

      setColumnVisibility(updater)
    },
    [columnVisibility, viewStore]
  )

  // Pagination
  const [pagination, setPagination] = useState(
    view?.pagination ?? viewDefaults.pagination
  )

  /**
   * Update pagination state and save it in the database.
   *
   * useReactTable's onPaginationChange may trigger even if pagination state didn't change,
   * for example when the number of rows in the table changes.
   */
  const onPaginationChange = useMemo(
    () => (updater: Updater<PaginationState>) => {
      if (viewStore) {
        const newPagination =
          updater instanceof Function ? updater(pagination) : updater

        if (
          newPagination.pageIndex != pagination.pageIndex ||
          newPagination.pageSize != pagination.pageSize
        ) {
          axios.post(store().url, {
            pagination: JSON.stringify(newPagination),
            ...viewStore
          })

          setPagination(updater)
        }
      } else {
        setPagination(updater)
      }
    },
    [pagination, viewStore]
  )

  // Row selection
  const [rowSelection, setRowSelection] = useState(() => ({}))

  // Sorting
  const [sorting, setSorting] = useState<SortingState>(
    () => view?.sorting ?? viewDefaults.sorting
  )

  /**
   * Update sorting state and save it in the database.
   */
  const onSortingChange = useMemo(
    () => (updater: Updater<SortingState>) => {
      if (viewStore) {
        axios.post(store().url, {
          sorting: JSON.stringify(
            updater instanceof Function ? updater(sorting) : updater
          ),
          ...viewStore
        })
      }

      setSorting(updater)
    },
    [sorting, viewStore]
  )

  return {
    columnFilters,
    columnVisibility,
    data,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onPaginationChange,
    onSortingChange,
    pagination,
    rowSelection,
    setColumnFilters,
    setColumnVisibility,
    setData,
    setPagination,
    setRowSelection,
    setSorting,
    sorting
  }
}
