describe('Invitations index page', () => {
  before(() => {
    cy.refreshDB()
  })

  beforeEach(() => {
    cy.session(
      'alice@example.com',
      () => {
        cy.loginAsAdmin()
      },
      {
        validate: () => {
          cy.getCookie('thirteen-session').should('exist')
        }
      }
    )

    cy.visit('/dashboard/invitations')
  })

  it('may send a new invitation', function () {
    cy.get('#create-invitation-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form }).type('New User')
      cy.get('input[name=email]', { withinSubject: $form }).type(
        'new@example.com{enter}'
      )
    })

    cy.contains('Invitation sent').should('exist')
  })

  it('may renew an existing invitation', function () {
    cy.get(
      '#invitations-table>tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="renew"]').click()

    cy.contains('Invitation renewed').should('exist')
  })

  it('may delete an invitation', function () {
    cy.get(
      '#invitations-table>tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="open-delete-dialog"]').click()
    cy.get('#destroy-dialog-form').then(($form) => {
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Invitation revoked').should('exist')
  })
})
