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

  it('may open the mobile menu', function () {
    cy.viewport('iphone-6')

    cy.get('#toggle-sidebar').click()

    cy.get('#open-user-menu').should('contain', 'Alice Admin')
  })

  it('may reach the projects page', function () {
    cy.get('#to-projects').click()

    cy.url().should('match', /\/dashboard\/teams\/[0-9]+\/projects$/)
  })

  it('may reach the current team page', function () {
    cy.get('#to-current-team').click()

    cy.url().should('match', /\/dashboard\/teams\/[0-9]+$/)
  })

  it('may reach the teams page', function () {
    cy.get('#to-teams').click()

    cy.url().should('match', /\/dashboard\/teams$/)
  })

  it('may reach the invitations page', function () {
    cy.get('#to-invitations').click()

    cy.url().should('match', /\/dashboard\/invitations$/)
  })

  it('may reach the settings page', function () {
    cy.get('#to-settings').click()

    cy.url().should('match', /\/dashboard\/settings$/)
  })

  it('may reach the account page', function () {
    cy.get('#open-user-menu').click()
    cy.get('#to-account').click()

    cy.url().should('match', /\/dashboard\/account$/)
  })

  it('may reach the profile page', function () {
    cy.get('#open-user-menu').click()
    cy.get('#to-profile').click()

    cy.url().should('match', /\/dashboard\/profile\/[0-9]+$/)
  })
})
