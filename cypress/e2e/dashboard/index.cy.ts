describe('Dashboard Page', () => {
  before(() => {
    cy.refreshDB()
  })

  beforeEach(() => {
    cy.session(
      'alice@example.com',
      () => {
        cy.loginAsUser()
      },
      {
        validate: () => {
          cy.getCookie('thirteen-session').should('exist')
        }
      }
    )

    cy.visit('/dashboard')
  })

  it.skip('may reach the account page from the dashboard homepage', function () {
    // ->defer(fn () => actingAs(User::first()))
    // ->visit('/dashboard')
    // ->on()
    // ->mobile()
    // ->click('@toggle-sidebar')
    // ->click('Test User')
    // ->click('Account')
    // ->assertTitleContains('Account');
  })

  // @TODO
})

// it('may reach the profile page from the dashboard homepage')
//     ->defer(fn () => actingAs(User::first()))
//     ->visit('/dashboard')
//     ->on()
//     ->mobile()
//     ->click('@toggle-sidebar')
//     ->click('Test User')
//     ->click('Profile')
//     ->assertTitleContains('profile');

// it('may reach the teams index page from the dashboard homepage')
//     ->defer(fn () => actingAs(User::first()))
//     ->visit('/dashboard')
//     ->on()
//     ->mobile()
//     ->click('@toggle-sidebar')
//     ->click('Teams')
//     ->assertTitleContains('Teams');
