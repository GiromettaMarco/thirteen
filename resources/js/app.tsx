import '../css/app.css'
import './bootstrap'

import AppContainer from '@/app-container'
import { APP_NAME } from '@/config'
import type { Appearance } from '@/types'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import type { ReactComponent } from 'node_modules/@inertiajs/react/types/types'
import { createRoot, hydrateRoot } from 'react-dom/client'

createInertiaApp({
  title: (title) => (title ? `${title} - ${APP_NAME}` : APP_NAME),

  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob<ReactComponent>('./pages/**/*.tsx')
    ),

  setup({ el, App, props }) {
    const appearance = props.initialPage.props.appearance as Appearance

    if (import.meta.env.SSR) {
      // SSR
      hydrateRoot(
        el,
        <AppContainer
          appearance={appearance}
          children={<App {...props} />}
        />
      )
    } else {
      // CSR
      createRoot(el).render(
        <AppContainer
          appearance={appearance}
          children={<App {...props} />}
        />
      )
    }
  },

  progress: {
    color: '#4B5563'
  }
})
