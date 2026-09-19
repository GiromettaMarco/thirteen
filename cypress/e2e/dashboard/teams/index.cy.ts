describe('Teams index page', () => {
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

    cy.visit('/dashboard/teams')
  })

  it('may change the current team', function () {
    cy.get(
      '#teams-table tbody>tr:nth-child(2) button[data-action="set-current-team"]'
    ).click()

    cy.contains('Current team changed').should('exist')
  })

  it('may create a new team', function () {
    cy.get('#open-create-team-drawer').click()

    cy.get('#create-team-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('Another Team{enter}')
    })

    cy.contains('Team created').should('exist')
  })

  it('may update a team from the teams index', function () {
    cy.get(
      '#teams-table tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="open-update-drawer"]').click()
    cy.get('#update-team-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('New Team Name{enter}')
    })

    cy.contains('Team updated').should('exist')
  })

  it('may delete a team from the teams index', function () {
    cy.get(
      '#teams-table tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="open-delete-dialog"]').click()
    cy.get('#destroy-dialog-form').then(($form) => {
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Team deleted').should('exist')
  })
})
