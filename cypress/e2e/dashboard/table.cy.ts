describe('Dashboard index page', () => {
  before(() => {
    cy.refreshDB()
  })

  beforeEach(() => {
    cy.session(
      'alice@example.com',
      () => {
        cy.loginAsAdmin()
      },
      {
        validate: () => {
          cy.getCookie('thirteen-session').should('exist')
        }
      }
    )

    cy.visit('/dashboard')
  })

  it('may edit and preserve table states', function () {
    cy.viewport(1920, 1080)

    // Initial state
    cy.contains('Date created').should('exist')

    // Filters
    cy.get('button[data-action="filter-label"]').click()
    cy.get('div[data-action="select-documentation"]').click().type('{esc}')

    // Columns visibility
    cy.get('button[data-slot="columns-visibility"]').click()
    cy.get('div[data-action="toggle-created_at-visibility"]')
      .click()
      .type('{esc}')

    // Sorting
    cy.get('button[data-action="sort-priority"]').click()
    cy.get('button[data-action="sort-ascending"]').click()

    // Pagination
    cy.get('#your-tasks-table-pagination').click()
    cy.get('div[role=option]').contains('40').click()

    // Output
    cy.reload()
    cy.contains('Date created').should('not.exist')
  })
})
