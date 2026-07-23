import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren
} from 'react'
import {
  appearanceMediaQuery,
  applyTheme,
  getThemeFromAppearance,
  setAppearanceCookie
} from '@/lib/appearance'
import type { Appearance, Theme } from '@/types'

export const AppearanceContext = createContext<{
  appearance: Appearance
  theme: Theme
  updateAppearance: (appearance: Appearance) => void
}>({
  appearance: 'system',
  theme: 'light',
  updateAppearance: () => {
    console.error(
      'updateAppearance must be used within an AppearanceContext provider'
    )
  }
})

export default function AppearanceProvider({
  appearance: initialAppearance,
  children
}: PropsWithChildren<{ appearance: Appearance }>) {
  // Init states
  const [appearance, setAppearance] = useState<Appearance>(initialAppearance)
  const [theme, setTheme] = useState<Theme>(
    getThemeFromAppearance(initialAppearance)
  )

  // Listen for client changes
  useEffect(() => {
    // Handle system preference change
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (appearance === 'system') {
        if (event.matches) {
          setTheme('dark')
          applyTheme('dark')
        } else {
          setTheme('light')
          applyTheme('light')
        }
      }
    }

    // Get the MediaQueryList object
    const mediaQueryList = appearanceMediaQuery()

    // Add listener
    mediaQueryList?.addEventListener('change', handleSystemThemeChange)

    // Remove listener
    return () => {
      mediaQueryList?.removeEventListener('change', handleSystemThemeChange)
    }
  }, [appearance])

  // Handle appearance and theme together
  const updateAppearance = (appearance: Appearance) => {
    // Save locally
    setAppearanceCookie(appearance)

    // Set appearance context
    setAppearance(appearance)

    // Set theme context
    const theme = getThemeFromAppearance(appearance)
    setTheme(theme)

    // Apply theme to the document
    applyTheme(theme)
  }

  return (
    <AppearanceContext value={{ appearance, theme, updateAppearance }}>
      {children}
    </AppearanceContext>
  )
}
