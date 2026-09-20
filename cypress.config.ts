import { execFileSync } from 'child_process'
import registerCodeCoverageTasks from '@cypress/code-coverage/task'
import { defineConfig } from 'cypress'

export default defineConfig({
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
      on('task', {
        refreshDB() {
          execFileSync('php', [
            'artisan',
            'migrate:fresh',
            '--seed',
            '--seeder=TestSeeder',
            '--env=testing'
          ])

          return null
        }
      })

      registerCodeCoverageTasks(on, config)

      return config
    }
  }
})
