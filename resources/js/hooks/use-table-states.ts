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
  // action,
  data: initialData
  // submit,
  // view
}: {
  // action?: string
  data: TData[]
  // submit?: FetcherSubmitFunction
  // view?: View
}) {
  // Table data
  const [data, setData] = useState<TData[]>(() => initialData)

  // Column filters
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    () => []
    // () => view?.filters ?? []
  )

  /**
   * Update column filters state and save it in the database.
   *
   * "name" column filter doesn't concur for db state calculation.
   */
  const onColumnFiltersChange = useMemo(
    () => (updater: Updater<ColumnFiltersState>) => {
      // if (action && submit) {
      //   const newFilters =
      //     updater instanceof Function ? updater(columnFilters) : updater
      //   const newFiltersWithoutName: ColumnFiltersState = []

      //   for (const columnFilter of newFilters) {
      //     if (columnFilter.id !== 'name') {
      //       newFiltersWithoutName.push(columnFilter)
      //     }
      //   }

      //   let oldFiltersSizeWithoutName = 0
      //   for (const columnFilter of columnFilters) {
      //     if (columnFilter.id !== 'name') {
      //       oldFiltersSizeWithoutName++
      //     }
      //   }

      //   if (newFiltersWithoutName.length !== oldFiltersSizeWithoutName) {
      //     submit(
      //       { filters: JSON.stringify(newFiltersWithoutName) },
      //       { action, method: 'POST' }
      //     )
      //   }
      // }

      setColumnFilters(updater)
    },
    []
    // [action, columnFilters, submit]
  )

  // Columns visibility
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => ({})
    // () => view?.visibility ?? {}
  )

  /**
   * Update column visibility state and save it in the database.
   */
  const onColumnVisibilityChange = useMemo(
    () => (updater: Updater<VisibilityState>) => {
      // if (action && submit) {
      //   submit(
      //     {
      //       visibility: JSON.stringify(
      //         updater instanceof Function ? updater(columnVisibility) : updater
      //       )
      //     },
      //     { action, method: 'POST' }
      //   )
      // }

      setColumnVisibility(updater)
    },
    []
    // [action, submit, columnVisibility]
  )

  // Pagination
  const [pagination, setPagination] = useState(
    () => ({
      pageIndex: 0,
      pageSize: 10
    })
    // view?.pagination ?? {
    //   pageIndex: 0,
    //   pageSize: 10
    // }
  )

  /**
   * Update pagination state and save it in the database.
   *
   * useReactTable's onPaginationChange may trigger even if pagination state didn't change,
   * for example when the number of rows in the table changes.
   */
  const onPaginationChange = useMemo(
    () => (updater: Updater<PaginationState>) => {
      // if (action && submit) {
      //   const newPagination =
      //     updater instanceof Function ? updater(pagination) : updater

      //   if (
      //     newPagination.pageIndex != pagination.pageIndex ||
      //     newPagination.pageSize != pagination.pageSize
      //   ) {
      //     submit(
      //       { pagination: JSON.stringify(newPagination) },
      //       { action, method: 'POST' }
      //     )

      //     setPagination(updater)
      //   }
      // } else {
      setPagination(updater)
      // }
    },
    []
    // [action, submit, pagination]
  )

  // Row selection
  const [rowSelection, setRowSelection] = useState(() => ({}))

  // Sorting
  const [sorting, setSorting] = useState<SortingState>(
    () => []
    // () => view?.sorting ?? []
  )

  /**
   * Update sorting state and save it in the database.
   */
  const onSortingChange = useMemo(
    () => (updater: Updater<SortingState>) => {
      // if (action && submit) {
      //   submit(
      //     {
      //       sorting: JSON.stringify(
      //         updater instanceof Function ? updater(sorting) : updater
      //       )
      //     },
      //     { action, method: 'POST' }
      //   )
      // }

      setSorting(updater)
    },
    []
    // [action, submit, sorting]
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
