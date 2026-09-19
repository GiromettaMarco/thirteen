import { Input } from '@gmcode/react-ui'
import { useDebouncedCallback } from '@tanstack/react-pacer'
import type { Column } from '@tanstack/react-table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Features, RowData } from '@/components/data-table/utility'

export function SearchFilter<TData extends RowData, TValue>({
  column,
  debounce = 300
}: {
  column: Column<Features, TData, TValue>
  debounce?: number
}) {
  // i18n
  const { t } = useTranslation()

  const [value, setValue] = useState(
    () => (column.getFilterValue() as string | undefined) ?? ''
  )

  function updateFilter(value: string) {
    column.setFilterValue(value)
  }

  const debouncedOnChange = useDebouncedCallback(updateFilter, {
    wait: debounce
  })

  return (
    <Input
      className="h-8 min-w-28 px-2 py-0"
      onChange={(event) => {
        setValue(event.target.value)
        debouncedOnChange(event.target.value)
      }}
      placeholder={t(($) => $.table.search)}
      value={value}
    />
  )
}
