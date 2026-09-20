describe('Register Page', () => {
  beforeEach(() => {
    cy.refreshDB()
    cy.visit('/register')
  })

  it('may register a new user, require email verification and throttle successful register submissions', function () {
    cy.get('#register-form').then(($form) => {
      const options = { withinSubject: $form }
      cy.get('input[name=name]', options).type('New Jack')
      cy.get('input[name=email]', options).type('new.jack@example.com')
      cy.get('input[name=password]', options).type('J13f*&h4df4zr')
      cy.get('input[name=password_confirmation]', options).type(
        'J13f*&h4df4zr{enter}'
      )
    })

    cy.url().should('include', '/verify-email')

    cy.get('#logout').click()

    cy.url().should('match', /\/$/)

    cy.visit('/register')
    cy.get('#register-form').then(($form) => {
      const options = { withinSubject: $form }
      cy.get('input[name=name]', options).type('Another Jack')
      cy.get('input[name=email]', options).type('another.jack@example.com')
      cy.get('input[name=password]', options).type('J13f*&h4df4zr')
      cy.get('input[name=password_confirmation]', options).type(
        'J13f*&h4df4zr{enter}'
      )
    })

    cy.contains('Too many attempts.').should('exist')
  })

  it('may throttle register submissions when email is already taken', function () {
    cy.get('#register-form').then(($form) => {
      const options = { withinSubject: $form }
      cy.get('input[name=name]', options).type('New Jack')
      cy.get('input[name=email]', options).type('alice@example.com')
      cy.get('input[name=password]', options).type('J13f*&h4df4zr')
      cy.get('input[name=password_confirmation]', options).type(
        'J13f*&h4df4zr{enter}'
      )

      cy.contains('This email has already been taken.').should('exist')

      cy.get('button[type=submit]').click().click()
    })

    cy.contains('Too many attempts.').should('exist')
  })
})
