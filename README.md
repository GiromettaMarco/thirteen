# Thirteen

[![PHP Coverage](docs/php-coverage.svg)](https://github.com/GiromettaMarco/thirteen/actions/workflows/tests.yml)
[![TS Coverage](docs/ts-coverage.svg)](https://github.com/GiromettaMarco/thirteen/actions/workflows/tests.yml)

Laravel 13 boilerplate with:

- React 19
- Inertia
- pnpm
- Vite+
- Tailwind CSS
- Shadcn
- Radix UI
- i18next
- Tanstack Table 9
- React Hook Form
- Pest 5
- Cypress

## Requirements

- PHP 8.4
- Composer
- Xdebug
- Vite+

## Setup

1. Install the application: `vpr setup`
2. Customize the `.env` file
3. Run migrations: `php artisan migrate --seed`
4. Start the dev server: `vpr dev`

## Tasks

| Command            | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| vpr                | Task selection                                  |
| vpr setup          | Install the application                         |
| vpr dev            | Start the development server                    |
| vpr dev:ssr        | Start the development server with SSR           |
| vpr build          | Build the application                           |
| vpr build:ssr      | Build the application with SSR                  |
| vpr build:e2e      | Build with instrumentation for E2E tests        |
| vpr e2e            | Run end-to-end tests with Cypress               |
| vpr e2e:ui         | Start the Cypress UI for E2E tests              |
| vpr php:test       | Run PHP tests with cache enabled                |
| vpr php:test-force | Run all PHP tests and generate a coverage badge |
| vpr php:fmt        | Format PHP code                                 |
| vpr php:lint       | Run PHP static analysis                         |
| vpr php:check      | Format php code and run static analysis         |

## Visual Studio Code

Copy the `.vscode` folder from `docs` to the root directory.

## License

[MIT license](https://github.com/GiromettaMarco/thirteen/blob/master/LICENSE.md)
