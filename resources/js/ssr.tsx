import AppContainer from '@/app-container'
import { APP_NAME } from '@/config'
import type { Appearance } from '@/types'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import ReactDOMServer from 'react-dom/server'

createServer((page) =>
  createInertiaApp({
    page,

    render: ReactDOMServer.renderToString,

    title: (title) => (title ? `${title} - ${APP_NAME}` : APP_NAME),

    resolve: (name) =>
      resolvePageComponent(
        `./pages/${name}.tsx`,
        import.meta.glob('./pages/**/*.tsx')
      ),

    setup: ({ App, props }) => (
      <AppContainer
        appearance={props.initialPage.props.appearance as Appearance}
        children={<App {...props} />}
      />
    )
  })
)
