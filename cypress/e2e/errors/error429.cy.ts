// @TODO Refresh db with lower rate limiter config
it.skip('may display a 429 page', function () {
  // cy.refreshWithLimiter()

  cy.visit('/')
  cy.visit('/', { failOnStatusCode: false })

  cy.get('h1').should('contain', 'Too Many Requests')
})
