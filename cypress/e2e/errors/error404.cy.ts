it('may display a 404 page', function () {
  cy.refreshDB()

  cy.visit('/nowhere', { failOnStatusCode: false })

  cy.get('h1').should('contain', 'Page not found')
})
