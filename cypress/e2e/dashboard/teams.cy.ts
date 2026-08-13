describe('Teams Page', () => {
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
    cy.get('#set-current-team-2').click()

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

  it('may update and delete a team from the teams index', function () {
    cy.get('#open-team-1-actions').click()
    cy.get('#open-update-team-1-drawer').click()
    cy.get('#update-team-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('New Team Name{enter}')
    })

    cy.contains('Team updated').should('exist')

    cy.get('#open-team-1-actions').click()
    cy.get('#open-delete-team-1-dialog').click()
    cy.get('#destroy-dialog').then(($form) => {
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Team deleted').should('exist')
  })
})
