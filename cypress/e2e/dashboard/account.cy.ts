describe('Account page', () => {
  beforeEach(() => {
    cy.refreshDB()
    cy.loginAsUser()
    cy.visit('/dashboard/account')
  })

  it('may update the user email and require email verification to proceed', function () {
    cy.get('#update-email-form').then(($form) => {
      cy.get('input[name=email]', { withinSubject: $form })
        .clear()
        .type('info@example.com{enter}')
    })

    cy.url().should('include', '/verify-email')
  })

  it('may update the user password', function () {
    cy.get('#update-password-form').then(($form) => {
      const options = { withinSubject: $form }
      cy.get('input[name=current_password]', options).type('KL$M(bgd#bhd42')
      cy.get('input[name=password]', options).type('J13f*&h4df4zr')
      cy.get('input[name=password_confirmation]', options).type(
        'J13f*&h4df4zr{enter}'
      )
    })

    cy.contains('Password updated').should('exist')
  })

  it('may delete other browser sessions', function () {
    cy.get('#open-delete-sessions-dialog').click()
    cy.get('#delete-sessions-form').then(($form) => {
      cy.get('input[name=password]', { withinSubject: $form }).type(
        'KL$M(bgd#bhd42{enter}'
      )
    })

    cy.contains('Browser sessions deleted').should('exist')
  })

  it('may delete the account', function () {
    cy.get('#open-delete-account-dialog').click()
    cy.get('#delete-account-form').then(($form) => {
      cy.get('input[name=password]', { withinSubject: $form }).type(
        'KL$M(bgd#bhd42{enter}'
      )
    })

    cy.url().should('include', '/login')
  })
})
