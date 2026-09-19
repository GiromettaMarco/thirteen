import { createInertiaApp } from '@inertiajs/react'
import AppContainer from '@/app-container'
import { APP_NAME } from '@/config'
import { getSSRProps } from '@/lib/utils'

void createInertiaApp({
  progress: {
    color: '#4B5563'
  },
  strictMode: import.meta.env.DEV,
  title: (title) => (title ? `${title} - ${APP_NAME}` : APP_NAME),
  withApp(app) {
    const { appearance, locale } = getSSRProps(app.props)

    return (
      <AppContainer
        appearance={appearance}
        locale={locale}
      >
        {app}
      </AppContainer>
    )
  }
})
