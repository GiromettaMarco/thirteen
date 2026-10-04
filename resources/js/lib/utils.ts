import type { CheckedState } from '@gmcode/react-ui'
import type { Locale as DateFnsLocale } from 'date-fns'
import { format as originalFormat } from 'date-fns'
import { it } from 'date-fns/locale'
import { supportedAppearance, supportedLocales } from '@/config'
import type {
  AnyItem,
  Appearance,
  Locale as AppLocale,
  SSRProps,
  TaskPriority
} from '@/types'

//#region Type Guards
export function isObject(input: unknown): input is object {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}

export function isAnyItem(input: unknown): input is AnyItem {
  return (
    isObject(input) &&
    'id' in input &&
    ['string', 'number'].includes(typeof input.id) &&
    (!('name' in input) || typeof input.name === 'string')
  )
}

export function isAppearance(input: unknown): input is Appearance {
  return typeof input === 'string' && supportedAppearance.includes(input)
}

export function isLocale(input: unknown): input is AppLocale {
  return typeof input === 'string' && supportedLocales.includes(input)
}

export function getSSRProps(input: unknown): SSRProps {
  const ssrProps: SSRProps = {
    appearance: 'system',
    locale: 'en'
  }

  // Type guard
  if (
    isObject(input) &&
    'initialPage' in input &&
    isObject(input.initialPage) &&
    'props' in input.initialPage &&
    isObject(input.initialPage.props)
  ) {
    const props = input.initialPage.props

    if ('appearance' in props && isAppearance(props.appearance)) {
      ssrProps.appearance = props.appearance
    }

    if ('locale' in props && isLocale(props.locale)) {
      ssrProps.locale = props.locale
    }
  }

  return ssrProps
}

//#region Cookie
/**
 * Set a cookie client-side with default values.
 *
 * @param name The cookie name
 * @param value The cookie value
 * @param days Days before expiring (default: 365)
 * @returns The saved cookie string
 */
export function setClientCookie(
  name: string,
  value: string | number | boolean,
  days = 365
): string {
  const maxAge = days * 24 * 60 * 60

  return (document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`)
}

/**
 * Delete a client-side cookie.
 *
 * @param name
 * @returns The string used to delete the cookie
 */
export function deleteClientCookie(name: string): string {
  return setClientCookie(name, '', 0)
}

//#region Tables
/**
 * Default values for a table view.
 */
export const viewDefaults = {
  filters: [],
  pagination: { pageIndex: 0, pageSize: 10 },
  sorting: [],
  visibility: {}
}

export function sortPriority(priorityA: TaskPriority, priorityB: TaskPriority) {
  const a = priorityA === 'high' ? 3 : priorityA === 'medium' ? 2 : 1
  const b = priorityB === 'high' ? 3 : priorityB === 'medium' ? 2 : 1
  return a > b ? 1 : a < b ? -1 : 0
}

//#region Date
/**
 * Additional supported locales for date-fns.
 */
export const dateLocales: {
  [key: string]: DateFnsLocale
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

//#region Checkbox
export function isIndeterminate(checked: CheckedState | undefined) {
  return checked === 'indeterminate'
}

export function getCheckedState(checked: CheckedState | undefined) {
  return isIndeterminate(checked)
    ? 'indeterminate'
    : checked
      ? 'checked'
      : 'unchecked'
}

//#region Misc
/**
 * Filler for functions declared in a react context provider.
 */
export function missingFn() {
  console.error('This function must be used within its own context provider.')
}
