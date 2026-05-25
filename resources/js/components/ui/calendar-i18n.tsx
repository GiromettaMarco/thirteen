import { Calendar } from '@/components/ui/calendar'
import { dateLocales } from '@/lib/utils'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

export function CalendarI18n(props: ComponentProps<typeof Calendar>) {
  // i18n
  const { i18n } = useTranslation()

  return (
    <Calendar
      locale={dateLocales[i18n.language]}
      {...props}
    />
  )
}
