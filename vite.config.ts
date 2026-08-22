import { wayfinder } from '@laravel/vite-plugin-wayfinder'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import istanbul from 'vite-plugin-istanbul'
import { defineConfig, lazyPlugins } from 'vite-plus'

const isE2E = process.env.E2E === 'true'

export default defineConfig({
  build: isE2E
    ? {
        rollupOptions: {
          checks: {
            invalidAnnotation: false
          },
          output: {
            manualChunks: () => 'bundle'
          }
        },
        sourcemap: true
      }
    : undefined,
  fmt: {
    htmlWhitespaceSensitivity: 'css',
    ignorePatterns: ['composer.lock', 'pnpm-lock.yaml'],
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
      'reports'
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
      'typescript/no-namespace': ['error', { allowDeclarations: true }],
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
    !process.env.VITEST
      ? laravel({
          input: ['resources/css/app.css', 'resources/js/app.tsx'],
          refresh: true,
          ssr: 'resources/js/ssr.tsx'
        })
      : undefined,
    isE2E
      ? istanbul({
          exclude: [
            'resources/js/actions/**',
            'resources/js/locales/**',
            'resources/js/routes/**',
            'resources/js/wayfinder/**'
          ],
          extension: ['.ts', '.tsx'],
          forceBuildInstrument: true,
          include: 'resources/js/*',
          requireEnv: false
        })
      : undefined,
    react(),
    // @see https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#react-compiler
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    !process.env.VITEST ? wayfinder() : undefined
  ]),
  resolve: {
    tsconfigPaths: true
  },
  run: {
    cache: true,
    tasks: {
      build: {
        command: 'vp build',
        input: [
          'resources/css/**',
          'resources/fonts/**',
          'resources/js/**',
          'pnpm-lock.yaml'
        ]
      },
      'build:e2e': {
        command: 'cross-env E2E=true vp build',
        input: [
          'resources/css/**',
          'resources/fonts/**',
          'resources/js/**',
          'pnpm-lock.yaml'
        ]
      },
      'build:ssr': {
        command: 'vp build --ssr',
        dependsOn: ['build'],
        input: [
          'resources/css/**',
          'resources/fonts/**',
          'resources/js/**',
          'pnpm-lock.yaml'
        ]
      },
      e2e: {
        command:
          'start-server-and-test "composer run e2e" 8000 "cypress run --e2e --browser chrome"',
        dependsOn: ['build:e2e'],
        input: ['cypress/**', 'public/**'],
        output: ['.nyc_output/**', 'reports/cypress/**']
      },
      'e2e:ui': {
        cache: false,
        command:
          'start-server-and-test "composer run e2e" 8000 "cypress open --e2e --browser chrome"',
        dependsOn: ['build:e2e']
      },
      ready: {
        command: ['vp check', 'vpr test', 'vpr build:ssr']
      }
    }
  },
  staged: {
    '!(**/*.php)*': ['vp check --fix'],
    '**/*.php': ['php ./vendor/bin/pint']
  }
})
