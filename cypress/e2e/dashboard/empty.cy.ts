describe('Teams index page', () => {
  before(() => {
    cy.refreshDB()
  })

  beforeEach(() => {
    cy.session(
      'stray@example.com',
      () => {
        cy.loginAsStrayUser()
      },
      {
        validate: () => {
          cy.getCookie('thirteen-session').should('exist')
        }
      }
    )

    cy.visit('/dashboard')
  })

  it('may guide the user to create their first team', function () {
    cy.get('#to-teams').click()

    cy.get('#teams-table-filler').should('exist')

    // Open drawer
    cy.get('#teams-table-filler').then(($container) => {
      cy.get('#open-create-team-drawer', { withinSubject: $container }).click()
    })

    // Fill form
    cy.get('#create-team-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('My first team{enter}')
    })

    cy.contains('Team created').should('exist')
  })

  it('may guide the user to create their first project', function () {
    cy.get('#to-projects').click()

    // Open drawer
    cy.get('#projects-table-filler').then(($container) => {
      cy.get('#open-create-project-drawer', {
        withinSubject: $container
      }).click()
    })

    // Fill form
    cy.get('#create-project-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('My first project{enter}')
    })

    cy.contains('Project created').should('exist')
  })

  it('may guide the user to create their first task', function () {
    cy.get('#to-projects').click()

    cy.get(
      '#projects-table tbody>tr:first-child a[data-action="resource"]'
    ).click()

    // Open drawer
    cy.get('#tasks-table-filler').then(($container) => {
      cy.get('#open-create-task-drawer', {
        withinSubject: $container
      }).click()
    })

    // Fill form
    cy.get('#create-task-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('My first task{enter}')
    })

    cy.contains('Task created').should('exist')
  })
})
