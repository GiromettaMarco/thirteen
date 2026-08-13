import registerCodeCoverageTasks from '@cypress/code-coverage/task'
import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,

  // component: {
  //   devServer: {
  //     bundler: 'vite',
  //     framework: 'react'
  //   }
  // },

  e2e: {
    baseUrl: 'http://localhost:8000',
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config)
      return config
    }
  }
})
