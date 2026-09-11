declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string, username: string): Chainable<void>
      loginAsAdmin(): Chainable<void>
      loginAsUser(): Chainable<void>
      refreshDB(): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/login')
  cy.get('#login-form').then(($form) => {
    const options = { withinSubject: $form }
    cy.get('input[name=email]', options).type('alice@example.com')
    cy.get('input[name=password]', options).type('AJf$hj7jn&bdMc{enter}')
  })
  cy.url().should('include', '/dashboard')
  cy.get('#open-user-menu').should('contain', 'Alice Admin')
})

Cypress.Commands.add('loginAsUser', () => {
  cy.visit('/login')
  cy.get('#login-form').then(($form) => {
    const options = { withinSubject: $form }
    cy.get('input[name=email]', options).type('bob@example.com')
    cy.get('input[name=password]', options).type('KL$M(bgd#bhd42{enter}')
  })
  cy.url().should('include', '/dashboard')
  cy.get('#open-user-menu').should('contain', 'Bob Brown')
})

Cypress.Commands.add('login', (email, password, username) => {
  cy.visit('/login')
  cy.get('#login-form').then(($form) => {
    const options = { withinSubject: $form }
    cy.get('input[name=email]', options).type(email)
    cy.get('input[name=password]', options).type(`${password}{enter}`)
  })
  cy.url().should('include', '/dashboard')
  cy.get('#open-user-menu').should('contain', username)
})

Cypress.Commands.add('refreshDB', () => {
  cy.task('refreshDB')
  void Cypress.session.clearAllSavedSessions()
})

export {}
