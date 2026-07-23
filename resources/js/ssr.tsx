import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import ReactDOMServer from 'react-dom/server'
import AppContainer from '@/app-container'
import { APP_NAME } from '@/config'
import type { Appearance } from '@/types'

createServer((page) =>
  createInertiaApp({
    page,

    render: ReactDOMServer.renderToString,

    resolve: (name) =>
      resolvePageComponent(
        `./pages/${name}.tsx`,
        import.meta.glob<ResolvedComponent>('./pages/**/*.tsx')
      ),

    setup: ({ App, props }) => (
      <AppContainer
        appearance={props.initialPage.props.appearance as Appearance}
      >
        <App {...props} />
      </AppContainer>
    ),

    title: (title) => (title ? `${title} - ${APP_NAME}` : APP_NAME)
  })
)
