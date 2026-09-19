describe('Projects index page', () => {
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

    cy.visit('/dashboard/teams/1/projects')
  })

  it('may create a new project', function () {
    cy.get('#open-create-project-drawer').click()

    cy.get('#create-project-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('Another Project{enter}')
    })

    cy.contains('Project created').should('exist')
  })

  it('may update a project from the projects index', function () {
    cy.get(
      '#projects-table tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="open-update-drawer"]').click()
    cy.get('#update-project-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('New Project Name{enter}')
    })

    cy.contains('Project updated').should('exist')
  })

  it('may delete a project from the projects index', function () {
    cy.get(
      '#projects-table tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="open-delete-dialog"]').click()
    cy.get('#destroy-dialog-form').then(($form) => {
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Project deleted').should('exist')
  })

  it('may delete many projects at once', function () {
    cy.get('#projects-table').then(($table) => {
      cy.get('tbody>tr:first-child button[role=checkbox]', {
        withinSubject: $table
      }).click()
      cy.get('button[data-action="open-destroy-many-dialog"]', {
        withinSubject: $table
      }).click()
    })

    cy.get('#destroy-many-dialog-form').then(($form) => {
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Projects deleted').should('exist')
  })
})
