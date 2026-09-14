describe('Public pages', () => {
  before(() => {
    cy.refreshDB()
  })

  it('may welcome the user', function () {
    cy.visit('/')

    cy.get('h1').should('contain', 'Welcome to Thirteen')
  })

  it('may navigate the mobile menu', function () {
    cy.viewport('iphone-6')

    cy.visit('/')

    cy.get('#open-mobile-menu').click()
    cy.contains('Dashboard').click()

    cy.url().should('include', '/login')
  })

  it('may display the forms page', function () {
    cy.visit('/forms')

    cy.get('h1').should('contain', 'Forms')
  })

  it('may display the authentication page', function () {
    cy.visit('/authentication')

    cy.get('h1').should('contain', 'Authentication')
  })
})
