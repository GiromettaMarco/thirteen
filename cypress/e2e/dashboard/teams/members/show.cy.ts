describe('Team member show page', () => {
  beforeEach(() => {
    cy.refreshDB()
  })

  it('may display the team member page', function () {
    cy.loginAsUser()

    cy.visit('/dashboard')
    cy.get('#to-current-team').click()
    cy.get(
      '#members-table tbody>tr:nth-child(1) a[data-action=resource]'
    ).click()

    cy.get('#permission-admin').should('exist')
  })

  it('may change a team member permissions', function () {
    cy.loginAsAdmin()

    cy.visit('/dashboard')
    cy.get('#to-current-team').click()
    cy.get(
      '#members-table tbody>tr:nth-child(2) a[data-action=resource]'
    ).click()

    cy.get('#update-member-permissions-form').then(($form) => {
      cy.get('#toggle-permission-admin', { withinSubject: $form }).click()
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Team member updated').should('exist')
  })
})
