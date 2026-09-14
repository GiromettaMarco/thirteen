describe('Teams show page', () => {
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

    cy.visit('/dashboard/teams/1')
  })

  it('may add a new member to a team', function () {
    cy.get('#open-add-team-member-drawer').click()

    cy.get('#search-profile-form').then(($form) => {
      cy.get('input[name=s]', { withinSubject: $form }).type(
        'stray@example.com{enter}'
      )
    })

    cy.get('#add-team-member-form').then(($form) => {
      cy.get('#profiles-list>li:first-child>button', {
        withinSubject: $form
      }).click()
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('A new member has joined the team').should('exist')
  })

  it('may reach the team member page from the actions menu', function () {
    cy.get(
      '#members-table>tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('a[data-action="show"]').click()

    cy.url().should('match', /\/dashboard\/teams\/1\/member\/[0-9]+/)
  })

  it('may remove a team member from the team page', function () {
    cy.get(
      '#members-table>tbody>tr:nth-child(2) button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="open-delete-dialog"]').click()
    cy.get('#destroy-dialog-form').then(($form) => {
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Team member removed').should('exist')
  })
})
