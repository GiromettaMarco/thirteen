import './bootstrap'

import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot, hydrateRoot } from 'react-dom/client'
import AppContainer from '@/app-container'
import { APP_NAME } from '@/config'
import type { Appearance } from '@/types'

void createInertiaApp({
  progress: {
    color: '#4B5563'
  },

  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob<ResolvedComponent>('./pages/**/*.tsx')
    ),

  setup({ App, el, props }) {
    const appearance = props.initialPage.props.appearance as Appearance

    if (import.meta.env.SSR) {
      // SSR
      hydrateRoot(
        el,
        <AppContainer appearance={appearance}>
          <App {...props} />
        </AppContainer>
      )
    } else {
      // CSR
      createRoot(el).render(
        <AppContainer appearance={appearance}>
          <App {...props} />
        </AppContainer>
      )
    }
  },

  title: (title) => (title ? `${title} - ${APP_NAME}` : APP_NAME)
})
