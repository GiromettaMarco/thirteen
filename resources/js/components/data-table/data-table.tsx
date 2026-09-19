'use client'

import { usePage } from '@inertiajs/react'
import { useTable, type ColumnDef, type Table } from '@tanstack/react-table'
import { use, useEffect, type ReactNode } from 'react'
import { browser } from 'react-dom'
import { Pagination } from '@/components/data-table/macros/pagination'
import { SelectionMonitor } from '@/components/data-table/macros/selection-monitor'
import { SortingMonitor } from '@/components/data-table/macros/sorting-monitor'
import { TableMain } from '@/components/data-table/macros/table-main'
import { Toolbar } from '@/components/data-table/macros/toolbar'
import {
  defaultState,
  features,
  type Features,
  type RowData
} from '@/components/data-table/utility'

interface MacroFeatures {
  columnsVisibility: boolean
  header: boolean
  pagination: boolean
  selectionMonitor: boolean
  sortingMonitor: boolean
  toolbar: boolean
}

export function DataTable<TData extends RowData>({
  actions,
  columns,
  data,
  debug = false,
  id,
  macros,
  storage,
  title
}: {
  actions?: (table: Table<Features, TData>) => ReactNode
  columns: ReadonlyArray<ColumnDef<Features, TData>>
  data: TData[]
  debug?: boolean
  id?: string
  macros?: Partial<MacroFeatures>
  storage?: string
  title?: string
}) {
  // Client only
  use(browser('This component requires browser APIs.'))

  const render: MacroFeatures = {
    columnsVisibility: macros?.columnsVisibility ?? true,
    header: macros?.header ?? true,
    pagination: macros?.pagination ?? true,
    selectionMonitor: macros?.selectionMonitor ?? false,
    sortingMonitor: macros?.sortingMonitor ?? false,
    toolbar: macros?.toolbar ?? true
  }

  const { user } = usePage().props.auth

  const storageKey = `13v.0.0.1_${user?.id}:${storage ?? id}`
  const storageState = localStorage.getItem(storageKey)

  const table = useTable(
    {
      columns,
      data,
      debugTable: debug,
      enableRowSelection: true,
      features,
      getRowId: (row) => String(row.id),
      initialState: storageState ? JSON.parse(storageState) : defaultState,
      key: id
    },
    (state) => state // default selector
  )

  // On table update, save its state to local storage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(table.state))
  }, [storageKey, table.state])

  return (
    <div
      className="grid gap-2"
      id={id}
    >
      {(render.header || render.toolbar) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {render.header && <header data-slot="table-title">{title}</header>}
          {render.toolbar && (
            <Toolbar
              actions={actions}
              table={table}
              visibility={render.columnsVisibility}
            />
          )}
        </div>
      )}

      <TableMain table={table} />

      {(render.sortingMonitor || render.pagination) && (
        <div className="grid gap-2">
          <div className="flex flex-row-reverse items-center justify-between gap-2">
            {render.pagination && (
              <Pagination
                className="flex-none"
                inputId={`${id}-pagination`}
                table={table}
              />
            )}
            {render.selectionMonitor && (
              <SelectionMonitor
                className="flex-none"
                table={table}
              />
            )}
          </div>
          {render.sortingMonitor && <SortingMonitor table={table} />}
        </div>
      )}
    </div>
  )
}
