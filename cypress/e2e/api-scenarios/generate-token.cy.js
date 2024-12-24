describe('Geração de token de acesso', () => {

    it('Deve gerar um token de acesso com sucesso', () => {

        const credentials = {
            userName: 'testUser',
            password: 'Password@123'
        };

        cy.request({
            method: 'POST',
            url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
            body: credentials,
            failOnStatusCode: false
        })
            .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('status', 'Success');
            expect(response.body).to.have.property('result', 'User authorized successfully.');

            const token = response.body.token;
            cy.wrap(token).as('accessToken');
        });
    });
});
