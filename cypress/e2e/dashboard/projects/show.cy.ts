describe('Project show page', () => {
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

    cy.visit('/dashboard/teams/1/projects/1')
  })

  it('may create a new task', function () {
    cy.get('#open-create-task-drawer').click()

    cy.get('#create-task-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('Another Task{enter}')
    })

    cy.contains('Task created').should('exist')
  })

  it('may update a task from the project page', function () {
    cy.get(
      '#tasks-table>tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="open-update-drawer"]').click()
    cy.get('#update-task-form').then(($form) => {
      cy.get('input[name=name]', { withinSubject: $form })
        .clear()
        .type('New Task Name{enter}')
    })

    cy.contains('Task updated').should('exist')
  })

  it('may delete a task from the project page', function () {
    cy.get(
      '#tasks-table>tbody>tr:first-child button[data-action="open-actions"]'
    ).click()
    cy.get('button[data-action="open-delete-dialog"]').click()
    cy.get('#destroy-dialog-form').then(($form) => {
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Task deleted').should('exist')
  })

  it('may delete many tasks at once', function () {
    cy.get('#tasks-table>tbody>tr:first-child button[role=checkbox]').click()
    cy.get('#tasks-table-toolbar').then(($toolbar) => {
      cy.get('button[data-action="open-destroy-many-dialog"]', {
        withinSubject: $toolbar
      }).click()
    })
    cy.get('#destroy-many-dialog-form').then(($form) => {
      cy.get('button[type=submit]', { withinSubject: $form }).click()
    })

    cy.contains('Tasks deleted').should('exist')
  })
})
