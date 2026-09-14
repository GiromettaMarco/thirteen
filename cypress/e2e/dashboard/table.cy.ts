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

    // Filters
    cy.get('#your-tasks-table-toolbar').then(($toolbar) => {
      cy.get('button[data-action="filter-by-label"]', {
        withinSubject: $toolbar
      }).click()
    })
    cy.get('button[data-action="select-documentation"]').click()

    // Columns visibility
    cy.get('#your-tasks-table-toolbar').then(($toolbar) => {
      cy.get('button[data-action="toggle-columns-visibility"]', {
        withinSubject: $toolbar
      }).click()
    })
    cy.get('div[data-action="toggle-priority"]').click()

    // Sorting
    cy.get('#your-tasks-table>thead button[data-action="sort-by-name"]').click()
    cy.get('button[data-action="sort-ascending"]').click()

    // Pagination
    // cy.get('#your-tasks-rows-per-page').scrollIntoView().click()
    cy.get('#your-tasks-rows-per-page').click()
    cy.get('div[role=option]').contains('40').click()

    // Output
    cy.reload()
    cy.get('#your-tasks-after-table')
      .contains('Sorting: Name (asc)')
      .should('exist')
  })
})
