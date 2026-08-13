describe('Home Page', () => {
  it('may welcome the user', function () {
    cy.visit('/')

    cy.get('h1').should('contain', 'Welcome to Thirteen')
  })

  it.skip('may navigate the mobile menu', function () {
    // ->visit('/')
    // ->on()
    // ->mobile()
    // ->click('@open-mobile-menu')
    // ->click('Dashboard')
    // ->assertUrlIs('*/login');
  })
})
