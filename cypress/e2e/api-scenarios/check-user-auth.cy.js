describe('Confirmação de autorização do usuário', () => {

    it('Deve confirmar se o usuário está autorizado', () => {
        const credentials = {
            userName: 'testUser',
            password: 'Password@123',
        };

        cy.request({
            method: 'POST',
            url: 'https://bookstore.demoqa.com/Account/v1/Authorized',
            body: credentials,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.true;
        });
    });

    it('Deve retornar falso para um usuário não autorizado', () => {
        const invalidCredentials = {
            userName: 'invalidUser',
            password: 'WrongPassword123',
        };

        cy.request({
            method: 'POST',
            url: 'https://bookstore.demoqa.com/Account/v1/Authorized',
            body: invalidCredentials,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('code');
            expect(response.body.message).to.include('User not found!');
        });
    });
});
