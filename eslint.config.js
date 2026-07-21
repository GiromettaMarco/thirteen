import prettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'
import { defineConfig, globalIgnores } from 'eslint/config'
import typescript from 'typescript-eslint'

export default defineConfig([
  // Typescript
  ...typescript.configs.recommended,

  // React
  {
    plugins: {
      react: react
    },
    rules: {
      ...react.configs['jsx-runtime'].rules
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // React Hooks
  {
    plugins: {
      'react-hooks': reactHooks
    },
    rules: reactHooks.configs.recommended.rules
  },

  // Prettier
  prettier,

  // Storybook
  ...storybook.configs['flat/recommended'],

  // Ignores
  {
    ignores: [
      'vendor',
      'node_modules',
      'public',
      'bootstrap/ssr',
      'reports'
    ]
  },

  // Custom Rules
  {
    rules: {
      'react-hooks/incompatible-library': 'off'
    }
  },

  // Ignore mocks
  globalIgnores(['.storybook/mocks/inertia/*.js'])
])
