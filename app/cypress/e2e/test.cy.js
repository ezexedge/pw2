describe('Pruebas', () => {
  it('Debería visitar la página principal', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Eventos');
    cy.wait(1000); 
  });

  it('Debería llenar y enviar el formulario', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Eventos');

    const nombreEvento = 'Evento de Prueba';
    const fechaEvento = '2024-06-30';
    const precioEvento = '100';

    cy.get('input[name="nombre"]').type(nombreEvento);
    cy.wait(500); 
    cy.get('input[name="fecha"]').type(fechaEvento);
    cy.wait(500);
    cy.get('input[name="precio"]').type(precioEvento);

    cy.get('#crear').submit();

    cy.wait(1000);

    cy.contains(nombreEvento);
    cy.contains(precioEvento);
    cy.contains('Jun 30 2024'); 
  });

  it('Abrir el modal de edición, modificar valores y guardar cambios', () => {
    cy.visit('http://localhost:3000');

    cy.get('.card-body').should('exist');

    cy.get('.card-body .card-title').first().invoke('text').as('nombreEvento');

    cy.get('.card-body .btn-primary').first().click();

    cy.wait(1000); 

    cy.get('.modal-title').should('have.text', 'Editar Evento');
    cy.get('#editarEventoModal').should('be.visible');

    const nuevoNombre = 'Evento Modificado';
    const nuevaFecha = '2024-08-01'; 
    const nuevoPrecio = '5000';

    cy.get('#nombreEdit').clear().type(nuevoNombre);
    cy.wait(500); 
    cy.get('#fechaEdit').clear().type(nuevaFecha);
    cy.wait(500);
    cy.get('#precioEdit').clear().type(nuevoPrecio);

    cy.get('#formularioEdicionEvento').submit();

    cy.wait(1000);
  });

  it('Eliminar una tarjeta de evento', () => {
    cy.visit('http://localhost:3000');

    cy.get('.card-body').should('exist');

    cy.get('.card-body .card-title').first().invoke('text').as('nombreEvento');

    cy.get('.card-body .btn-danger').first().click();

    cy.wait(1000); 
  });
});
