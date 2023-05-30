describe('inicio de sesion', () => {
  beforeEach(() => {
    cy.visit('/auth/login')
  })

  it('Deberia mostrar un error si se ingresa un user incorrect', () => {
    const name = 'admin@30';
    const password = '12345678';

    cy.get('[formcontrolname="name"]').clear()
    cy.get('[formcontrolname="name"]').type(name);
    cy.get('[formcontrolname="password"]').clear();
    cy.get('[formcontrolname="password"]').type(password);

    cy.get('[type="submit"]').click();

    cy.get('#swal2-title').should('be.visible')
  })

  it('Deberia mostrar correctamente', () => {
    const name = 'admin@29';
    const password = '12345678';

    cy.get('[formcontrolname="name"]').clear()
    cy.get('[formcontrolname="name"]').type(name);
    cy.get('[formcontrolname="password"]').clear();
    cy.get('[formcontrolname="password"]').type(password);

    cy.get('[type="submit"]').click();

    cy.get('#swal2-title').should('be.visible')
  })
})
