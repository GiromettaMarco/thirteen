describe('Forgot Password Page', () => {
  beforeEach(() => {
    cy.refreshDB()
    cy.visit('/forgot-password')
  })

  it('may accept a forgot password submission and throttle requests', function () {
    cy.get('#forgot-password-form').then(($form) => {
      const options = { withinSubject: $form }
      cy.get('input[name=email]', options).type('alice@example.com{enter}')

      cy.contains('A reset link will be sent if the account exists.').should(
        'exist'
      )

      cy.get('input[name=email]', options).type('alice@example.com{enter}')

      cy.contains('Too many attempts.').should('exist')
    })
  })
})
