describe('Mocking a touch device', () => {
  before(() => {
    cy.refreshDB()

    cy.viewport('iphone-6')

    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setTouchEmulationEnabled',
      params: {
        enabled: true
      }
    })
  })

  it('may display the password rules', function () {
    cy.visit('/register')

    cy.get('button[data-action="show-rules"]').click()

    cy.contains('Must contain:').should('exist')
  })
})
