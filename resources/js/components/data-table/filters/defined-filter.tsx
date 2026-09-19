import { Button } from '@gmcode/react-ui'
import type { Column, RowData } from '@tanstack/react-table'
import { Funnel } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DropdownSelection } from '@/components/data-table/components/dropdown-selection'
import {
  getAllCheckedState,
  type CellValue,
  type Features
} from '@/components/data-table/utility'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function DefinedFilter<TData extends RowData, TValue>({
  column
}: {
  column: Column<Features, TData, TValue>
}) {
  // i18n
  const { t } = useTranslation()

  const filters = column.columnDef.meta?.filters ?? []

  const allFilters = filters.map((options) => options.value)

  const [selections, setSelections] = useState(() => {
    const rawFilter = column.getFilterValue() as TValue[] | undefined

    if (!Array.isArray(rawFilter)) {
      return allFilters
    }

    return rawFilter.map((filter) => {
      if (filter === null) {
        return null
      }

      if (filter === undefined) {
        return undefined
      }

      return String(filter)
    })
  })

  function updateAllFilters(add: boolean) {
    if (add) {
      setSelections(allFilters)
      column.setFilterValue(allFilters)
    } else {
      setSelections([])
      column.setFilterValue([])
    }
  }

  function updateFilters(add: boolean, value: CellValue) {
    const newArr = add
      ? selections.concat([value])
      : selections.filter((selection) => selection !== value)

    setSelections(newArr)
    column.setFilterValue(newArr)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t(($) => $.table.filter)}
          data-action={`filter-${column.id}`}
          size="icon-sm"
          variant="ghost"
        >
          <Funnel />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownSelection
          checked={getAllCheckedState(selections.length, allFilters.length)}
          data-action="select-all"
          label={t(($) => $.table.filterAll)}
          onCheckedChange={updateAllFilters}
        />

        <DropdownMenuSeparator />

        {filters.map((filter) => (
          <DropdownSelection
            checked={selections.includes(filter.value)}
            data-action={`select-${filter.key ?? String(filter.value)}`}
            Icon={filter.Icon}
            key={filter.key ?? String(filter.value)}
            label={filter.label}
            onCheckedChange={(checked) => updateFilters(checked, filter.value)}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
