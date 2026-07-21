/// <reference types="vitest/config" />
import { wayfinder } from '@laravel/vite-plugin-wayfinder'
import babel from '@rolldown/plugin-babel'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import laravel from 'laravel-vite-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
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
    react(),
    // @see https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#react-compiler
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    !testing ? wayfinder() : undefined
  ],

  resolve: {
    tsconfigPaths: true
  },

  // server: {
  //   host: true
  // },

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
            instances: [{ browser: 'chromium' }],
            provider: playwright()
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          alias
        }
      }
    ]
  }
})
