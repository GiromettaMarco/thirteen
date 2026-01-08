/// <reference types="vitest/config" />
import { wayfinder } from '@laravel/vite-plugin-wayfinder'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import laravel from 'laravel-vite-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import alias from './.storybook/alias'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

/** Vitest or Storybook environment */
const testing = process.env.VITEST || process.argv[1]?.includes('storybook')

export default defineConfig({
  plugins: [
    !testing
      ? laravel({
          input: ['resources/css/app.css', 'resources/js/app.tsx'],
          ssr: 'resources/js/ssr.tsx',
          refresh: true
        })
      : undefined,
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    }),
    tailwindcss(),
    !testing ? wayfinder() : undefined,
    tsconfigPaths()
  ],
  esbuild: {
    jsx: 'automatic'
  },

  // ,server: {
  //   host: true
  // }

  test: {
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      include: ['resources/js/components/ui/**'],
      reportsDirectory: './reports/ui'
    },
    projects: [
      {
        extends: true,
        plugins: [
          testing
            ? storybookTest({ configDir: path.join(dirname, '.storybook') })
            : null
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          alias
        }
      }
    ]
  }
})
