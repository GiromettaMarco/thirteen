import { type ClassValue, clsx } from 'clsx'
import type { Locale } from 'date-fns'
import { format as originalFormat } from 'date-fns'
import { it } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

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
