import type { CheckedState } from '@gmcode/react-ui'
import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  constructFilterFn,
  createColumnHelper as originalColumnHelper,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  filterFn_includesString,
  type TableState,
  metaHelper,
  sortFn_datetime
} from '@tanstack/react-table'
import type { FC, SVGProps } from 'react'

//#region Types
export interface RowData {
  id: string | number
}

export interface ColumnMeta {
  filters?: SelectionOption[]
  label?: string
}

//#region Features
export const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  columnMeta: metaHelper<ColumnMeta>(),
  columnVisibilityFeature,
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    calcSheetFilter: constructFilterFn({
      // Remove all if none are selected
      autoRemove: (value) => !value,
      filter: (dataValue: unknown, filterValue: unknown[]) =>
        filterValue.includes(dataValue)
    }),
    includesString: filterFn_includesString
  },
  globalFilteringFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
    text: sortFn_text
  }
})

export type Features = typeof features

export function createColumnHelper<TData extends RowData>() {
  return originalColumnHelper<Features, TData>()
}

export const defaultState: Partial<TableState<Features>> = {
  columnFilters: [],
  columnVisibility: {},
  globalFilter: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  rowSelection: {},
  sorting: []
}

//#region Filters
export type CellValue = string | number | null | undefined

export interface SelectionOption {
  empty?: boolean
  Icon?: FC<SVGProps<SVGSVGElement>>
  key?: string
  label?: string
  value: CellValue
}

export interface FacetedFilter<TValue = unknown> {
  quantity: number
  value: TValue
}

export type CompareFiltersFn<TValue = unknown> = (
  a: FacetedFilter<TValue>,
  b: FacetedFilter<TValue>
) => number

export function filtersComparison<TValue = unknown>(
  a: FacetedFilter<TValue>,
  b: FacetedFilter<TValue>
): number {
  if (typeof a.value === 'number' && typeof b.value === 'number') {
    return a.value - b.value
  }

  return a.value === b.value ? 0 : a.value > b.value ? 1 : -1
}

export function getAllCheckedState(
  selected: number,
  all: number
): CheckedState {
  if (selected === 0) {
    return false
  }

  if (selected === all) {
    return true
  }

  return 'indeterminate'
}
