import { createInertiaApp } from '@inertiajs/react'
import AppContainer from '@/app-container'
import { APP_NAME } from '@/config'
import type { Appearance, Locale } from '@/types'

void createInertiaApp({
  progress: {
    color: '#4B5563'
  },
  // strictMode: true,
  title: (title) => (title ? `${title} - ${APP_NAME}` : APP_NAME),
  withApp(app) {
    // oxlint-disable-next-line typescript/no-explicit-any
    const props = (app.props as any).initialPage.props

    return (
      <AppContainer
        appearance={props.appearance as Appearance}
        locale={props.locale as Locale}
      >
        {app}
      </AppContainer>
    )
  }
})
