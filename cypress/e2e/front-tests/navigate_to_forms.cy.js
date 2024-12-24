// cypress/e2e/forms_click.cy.js

describe('Clicar em Forms', () => {
    before(() => {
        cy.visit('https://demoqa.com/', { timeout: 60000 });
    });

    it('Deve clicar no card Forms', () => {
        cy.get('.card.mt-4.top-card', { timeout: 10000 })
            .contains('Forms')
            .scrollIntoView()
            .should('be.visible')
            .click()

        cy.url().should('include', '/forms')
    });

    it('Deve fechar o modal ao clicar no botão Close', () => {
        cy.get('.modal', { timeout: 10000 }).should('have.class', 'show')

        cy.get('#closeLargeModal', { timeout: 10000 })
            .should('be.visible')
            .scrollIntoView()
            .should('not.be.hidden')
            .click({ force: true })
        cy.get('.modal').should('not.have.class', 'show');
    });
});

Cypress.on('uncaught:exception', () => {
    return false;
});
