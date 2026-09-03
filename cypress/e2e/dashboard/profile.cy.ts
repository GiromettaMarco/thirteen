describe('Profile Page', () => {
  beforeEach(() => {
    cy.refreshDB()
    cy.loginAsUser()
    cy.visit('/dashboard')
    cy.get('#open-user-menu').click()
    cy.get('#to-profile').click()
    cy.url().should('include', '/dashboard/profile')
  })

  it('may update the user profile', function () {
    cy.get('#open-update-drawer').click()
    cy.get('#update-profile-form').then(($form) => {
      const options = { withinSubject: $form }
      cy.get('input[name=name]', options).clear().type('John Smith')
      cy.get('label', options).contains('Designer').click()
      cy.get('label', options).contains('Public profile').click()
      cy.get('button[type=submit]', options).click()
    })

    cy.contains('John Smith').should('exist')
    cy.contains('Designer').should('exist')
  })
})
