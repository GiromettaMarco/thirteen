import { defineConfig } from 'i18next-cli'

export default defineConfig({
  extract: {
    input: 'resources/js/**/*.{js,jsx,ts,tsx}',
    output: 'resources/js/locales/{{language}}/{{namespace}}.ts',
    outputFormat: 'ts',
    removeUnusedKeys: false
  },
  locales: ['en', 'it']
})
