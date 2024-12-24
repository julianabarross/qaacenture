describe('Test - Browser Windows', () => {

    it('Deve abrir uma nova janela e validar a mensagem', () => {
        // Acessar o site
        cy.visit('https://demoqa.com/forms')

        cy.contains('Alerts, Frame & Windows').click()

        cy.contains('Browser Windows').click()

        cy.contains('new Window').invoke('removeAttr', 'target').click()

        cy.url().should('include', 'sample')

        cy.contains('This is a sample page').should('be.visible')
    });
});
