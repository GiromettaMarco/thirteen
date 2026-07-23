import { wayfinder } from '@laravel/vite-plugin-wayfinder'
import babel from '@rolldown/plugin-babel'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig, lazyPlugins } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'
import alias from './.storybook/alias'

/** Vitest or Storybook environment */
const testing = process.env.VITEST || process.argv[1]?.includes('storybook')

export default defineConfig({
  fmt: {
    htmlWhitespaceSensitivity: 'css',
    ignorePatterns: [
      'resources/views/mail/*',
      'composer.lock',
      'pnpm-lock.yaml',
      '.storybook/mocks/inertia/*.js',
      '**/mockServiceWorker.js'
    ],
    printWidth: 80,
    semi: false,
    singleAttributePerLine: true,
    singleQuote: true,
    sortImports: {
      newlinesBetween: false,
      partitionByComment: true,
      partitionByNewline: true
    },
    sortPackageJson: {
      sortScripts: true
    },
    sortTailwindcss: {
      functions: ['clsx', 'cn', 'cva'],
      stylesheet: './resources/css/app.css'
    },
    tabWidth: 2,
    trailingComma: 'none'
  },
  lint: {
    categories: {
      correctness: 'warn'
    },
    env: {
      builtin: true
    },
    ignorePatterns: [
      'vendor',
      'node_modules',
      'public',
      'bootstrap/ssr',
      'reports',
      '.storybook/mocks/inertia/*.js'
    ],
    jsPlugins: [
      'eslint-plugin-perfectionist',
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin'
      }
    ],
    options: {
      typeAware: true,
      typeCheck: true
    },
    overrides: [
      {
        // @see https://github.com/oxc-project/oxc/issues/21525
        files: [
          '**/*.stories.{ts,tsx,js,jsx,mjs,cjs}',
          '**/*.story.{ts,tsx,js,jsx,mjs,cjs}'
        ],
        jsPlugins: ['eslint-plugin-storybook'],
        rules: {
          'storybook/await-interactions': 'error',
          'storybook/context-in-play-function': 'error',
          'storybook/default-exports': 'error',
          'storybook/hierarchy-separator': 'warn',
          'storybook/no-redundant-story-name': 'warn',
          'storybook/no-renderer-packages': 'error',
          'storybook/prefer-pascal-case': 'warn',
          'storybook/story-exports': 'error',
          'storybook/use-storybook-expect': 'error',
          'storybook/use-storybook-testing-library': 'error'
        }
      },
      {
        files: ['.storybook/main.{ts,tsx,js,jsx,mjs,cjs}'],
        jsPlugins: ['eslint-plugin-storybook'],
        rules: {
          'storybook/no-uninstalled-addons': 'error'
        }
      }
    ],
    plugins: ['oxc', 'typescript', 'unicorn', 'react'],
    rules: {
      'no-array-constructor': 'error',
      'no-unused-expressions': 'error',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'perfectionist/sort-interfaces': 'warn',
      'perfectionist/sort-jsx-props': 'warn',
      'perfectionist/sort-object-types': 'warn',
      'perfectionist/sort-objects': 'warn',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'react/exhaustive-deps': 'warn',
      'react/rules-of-hooks': 'error',
      'sort-vars': 'warn',
      'typescript/ban-ts-comment': 'error',
      'typescript/no-duplicate-enum-values': 'error',
      'typescript/no-empty-object-type': 'error',
      'typescript/no-explicit-any': 'error',
      'typescript/no-extra-non-null-assertion': 'error',
      'typescript/no-misused-new': 'error',
      'typescript/no-namespace': 'error',
      'typescript/no-non-null-asserted-optional-chain': 'error',
      'typescript/no-require-imports': 'error',
      'typescript/no-this-alias': 'error',
      'typescript/no-unnecessary-type-constraint': 'error',
      'typescript/no-unsafe-declaration-merging': 'error',
      'typescript/no-unsafe-function-type': 'error',
      'typescript/no-wrapper-object-types': 'error',
      'typescript/prefer-as-const': 'error',
      'typescript/prefer-namespace-keyword': 'error',
      'typescript/triple-slash-reference': 'error',
      'vite-plus/prefer-vite-plus-imports': 'error'
    }
  },
  plugins: lazyPlugins(() => [
    !testing
      ? laravel({
          input: ['resources/css/app.css', 'resources/js/app.tsx'],
          refresh: true,
          ssr: 'resources/js/ssr.tsx'
        })
      : undefined,
    react(),
    // @see https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#react-compiler
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    !testing ? wayfinder() : undefined
  ]),
  resolve: {
    tsconfigPaths: true
  },
  staged: {
    '!(**/*.php)*': ['vp check --fix'],
    '**/*.php': ['php ./vendor/bin/pint']
  },
  test: {
    coverage: {
      include: ['resources/js/components/ui/**'],
      provider: 'v8',
      reportsDirectory: './reports/ui'
    },
    projects: [
      {
        extends: true,
        plugins: [testing ? storybookTest() : null],
        test: {
          alias,
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright()
          },
          name: 'storybook'
        }
      }
    ],
    reporters: ['default']
  }
})
