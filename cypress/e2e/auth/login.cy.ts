describe('Login Page', () => {
  beforeEach(() => {
    cy.refreshDB()
    cy.visit('/login')
  })

  it('may sign in and sign out the user', function () {
    cy.get('#login-form').then(($form) => {
      const options = { withinSubject: $form }
      cy.get('input[name=email]', options).type('alice@example.com')
      cy.get('input[name=password]', options).type('AJf$hj7jn&bdMc{enter}')
    })

    cy.url().should('include', '/dashboard')

    cy.get('#open-user-menu').click()
    cy.get('#logout').click()

    cy.url().should('include', '/')
  })

  it('may validate and throttle login attempts', function () {
    cy.get('#login-form').then(($form) => {
      const options = { withinSubject: $form }
      cy.get('input[name=email]', options).type('alice@example.com')
      cy.get('input[name=password]', options).type('AJ36$s%j7jn&b{enter}')

      cy.contains('These credentials do not match our records.').should('exist')

      cy.get('button[type=submit]', options)
        .click()
        .click()
        .click()
        .click()
        .click()
    })

    cy.contains('Too many attempts.').should('exist')
  })
})
