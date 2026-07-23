import { CalendarField } from '@gmcode/forms'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { dateLocales } from '@/lib/utils'

export function CalendarFieldI18n<
  TFieldValues extends FieldValues = FieldValues
>(props: ComponentProps<typeof CalendarField<TFieldValues>>) {
  // i18n
  const { i18n } = useTranslation()

  return (
    <CalendarField
      locale={dateLocales[i18n.language]}
      {...props}
    />
  )
}
