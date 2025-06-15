describe('Flujo completo de compra', ()=>{
    beforeEach(() => {
        cy.intercept('GET', 'https://fakestoreapi.com/products', { fixture: 'products.json' });
        });

    it('completar la compra de 3 productos', ()=>{
        // Ir a la home
        cy.visit('/');

        // Añadir dos productos desde la home por data-cy con id único
        cy.get('[data-cy="product-details-19"]').click();
        cy.get('[data-cy=add-product]').click();
        cy.go('back');
        cy.get('[data-cy="product-details-18"]').click();
        cy.get('[data-cy=add-product]').click();
        cy.go('back');

        // Búsqueda de un producto específico y añadirlo
        cy.get('[data-cy=search-input]').type('Mens Cotton Jacket{enter}');
        cy.get('[data-cy="product-details-3"]').click();
        cy.get('[data-cy=add-product]').click();
        cy.go('back');

        // Ir al carrito
        cy.get('[data-cy=cart-button]').click();

        // Completar campos del formulario de compra
        cy.get('[data-cy=name-input]').type('Juan');
        cy.get('[data-cy=surname-input]').type('Pérez');
        cy.get('[data-cy=address-input]').type('Calle Falsa 123');
        cy.get('[data-cy=cp-input]').type('12345');
        cy.get('[data-cy=phone-input]').type('999999999');

        cy.get('[data-cy=send-data-button]').click();

        // Completar datos de pago
        cy.get('[data-cy=paycard-number-input]').type('9999999999999999');
        cy.get('[data-cy=expire-date-input]').type('1111');
        cy.get('[data-cy=cvc-input]').type('111');

        cy.get('[data-cy=confirm-payment-data-button]').click();

        // Comprobar que se ha llegado a la confirmación de pago
        cy.contains('Pago completado').should('be.visible');
        cy.url().should('include', '/payment-success');
    });
})