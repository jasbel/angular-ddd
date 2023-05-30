describe('Modulo Usuarios', ()=> {
  beforeEach(() => {
    cy.visit('/users')
  })

  it('Deberia mostrar la tabla', () => {
    cy.get('table').contains('Acciones')
  })
})

describe('Modulo Usuario crear', ()=> {
  beforeEach(() => {
    cy.visit('/users/create')
  })

  it('Deberia mostrar el formulario', () => {
    cy.get('form').contains('Crear Usuario')
  })
})
