describe('Settings Page', () => {
  before(() => {
    cy.refreshDB()
  })

  beforeEach(() => {
    cy.session(
      'bob@example.com',
      () => {
        cy.loginAsUser()
      },
      {
        validate: () => {
          cy.getCookie('thirteen-session').should('exist')
        }
      }
    )

    cy.visit('/dashboard/settings')
  })

  it('may change language from the settings page', function () {
    cy.get('#select-language').click()
    cy.get('#language-it').click()

    cy.contains('Impostazioni della lingua').should('exist')
  })

  it('may change appearance from the settings page', function () {
    cy.get('#select-appearance').click()
    cy.get('#appearance-dark').click()

    cy.get('html[class=dark]').should('exist')
  })
})
