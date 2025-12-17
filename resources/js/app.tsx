import '../css/app.css'

import AppContainer from '@/app-container'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot, hydrateRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    ),

  setup({ el, App, props }) {
    if (import.meta.env.SSR) {
      // SSR
      hydrateRoot(el, <AppContainer children={<App {...props} />} />)
    } else {
      // CSR
      createRoot(el).render(<AppContainer children={<App {...props} />} />)
    }
  },

  progress: {
    color: '#4B5563'
  }
})
