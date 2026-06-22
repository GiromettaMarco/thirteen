import {
  DocsContainer,
  type DocsContainerProps
} from '@storybook/addon-docs/blocks'
import type { ReactRenderer } from '@storybook/react-vite'
import type { PropsWithChildren } from 'react'
import { themes } from 'storybook/theming'

export default function DocsWithTheme({
  children,
  context,
  theme,
  ...props
}: PropsWithChildren<DocsContainerProps<ReactRenderer>>) {
  // theme is set to '' (empty string) on first application render
  const currentTheme =
    // @ts-expect-error: missing typing
    (context?.store?.userGlobals?.globals?.theme as Theme | undefined) || 'dark'

  // Get theme vars
  const themeVars =
    theme ?? (currentTheme === 'light' ? themes.light : themes.dark)

  return (
    <DocsContainer
      context={context}
      theme={themeVars}
      {...props}
    >
      {children}
    </DocsContainer>
  )
}
