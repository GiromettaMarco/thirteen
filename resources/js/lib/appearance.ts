import { COOKIE_APPEARANCE } from '@/config'
import { deleteClientCookie, setClientCookie } from '@/lib/utils'
import type { Appearance, Theme } from '@/types'

export function isAppearance(
  appearance: string | undefined
): appearance is Appearance {
  return (
    appearance !== undefined && ['dark', 'light', 'system'].includes(appearance)
  )
}

export function setAppearanceCookie(value: Appearance) {
  switch (value) {
    case 'dark':
    case 'light':
      setClientCookie(COOKIE_APPEARANCE, value)
      break

    case 'system':
    default:
      deleteClientCookie(COOKIE_APPEARANCE)
      break
  }
}

/**
 * Get the MediaQueryList object that can then be used to monitor the document to detect when it matches (or stops matching) that media query.
 *
 * Requires window to be set.
 *
 * @returns MediaQueryList object
 */
export function appearanceMediaQuery(): MediaQueryList {
  return window.matchMedia('(prefers-color-scheme: dark)')
}

export function userPrefersDark(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return appearanceMediaQuery().matches
}

export function getThemeFromAppearance(appearance: Appearance): Theme {
  if (appearance === 'system') {
    if (userPrefersDark()) {
      return 'dark'
    }

    return 'light'
  }

  return appearance
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
