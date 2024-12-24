
describe('Preencher e enviar Practice Form', () => {
    before(() => {
        cy.visit('https://demoqa.com/automation-practice-form', { timeout: 60000 })
    })

    it('Deve preencher e enviar o formulário', () => {

        cy.get('#firstName', { timeout: 10000 }).type('John')
        cy.get('#lastName').type('Doe')
        cy.get('#userEmail').type('johndoe@example.com')
        cy.get('[name="gender"]').check('Male', { force: true })
        cy.get('#userNumber').type('1234567890')
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__month-select').select('January')
        cy.get('.react-datepicker__year-select').select('2000')
        cy.get('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)').click()
        cy.get('#subjectsInput').type('Maths{enter}')
        cy.get('[for="hobbies-checkbox-1"]').click()
        cy.get('#uploadPicture').attachFile('example.txt')
        cy.get('#currentAddress').type('123 Cypress Street')
        cy.get('#submit').click()
        cy.get('.modal-content', { timeout: 10000 }).should('be.visible')

        cy.get('#closeLargeModal').click()
    });

});

Cypress.on('uncaught:exception', () => {
    return false;
});
