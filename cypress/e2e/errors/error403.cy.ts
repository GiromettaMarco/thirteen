// @NOTE Currently, all forbidden GET requests hide their resource with a 404.
it.skip('may display a 403 page', function () {
  cy.refreshDB()
  cy.loginAsUser()

  cy.visit('/dashboard/invitations', { failOnStatusCode: false })

  cy.get('h1').should('contain', 'Forbidden')
})
