import type { RawView, View } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import type { Locale } from 'date-fns'
import { format as originalFormat } from 'date-fns'
import { it } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

/**
 * Default values for a table view.
 */
export const viewDefaults = {
  filters: [],
  pagination: { pageIndex: 0, pageSize: 10 },
  sorting: [],
  visibility: {}
}

/**
 * Transform raw view data from the database to a JS object.
 */
export function parseView(view: RawView | null, fallback?: View): View {
  if (view === null) {
    return fallback ?? viewDefaults
  }

  // @NOTE replace import.meta.env.DEV with APP_DEBUG ?

  try {
    return {
      filters: JSON.parse(view.filters),
      pagination: JSON.parse(view.pagination),
      sorting: JSON.parse(view.sorting),
      visibility: JSON.parse(view.visibility)
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Invalid view format.', error)
    }
  }

  return fallback ?? viewDefaults
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fake network delay.
 *
 * @param ms Delay in milliseconds
 * @returns Promise resolved after ms
 */
export function delay(ms: number = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Additional supported locales for date-fns.
 */
export const dateLocales: {
  [key: string]: Locale
} = { it }

/**
 * Wrapper for the date-fns format function, with short codes for locale.
 *
 * @see https://date-fns.org/docs/format
 *
 * @param date The date to format
 * @param locale Locale short code (between the supported ones)
 * @param formatStr Format pattern
 * @returns The formatted date string
 */
export function format(
  date: string | number | Date,
  locale: string,
  formatStr: string = 'PPP'
) {
  return originalFormat(date, formatStr, {
    locale: dateLocales[locale]
  })
}

/**
 * Filler for functions declared in a react context provider.
 */
export function missingFn() {
  console.error('This function must be used within its own context provider.')
}

/**
 * Format date for database insert.
 *
 * @param date A date object
 */
export function formatDateForDB(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`
}
