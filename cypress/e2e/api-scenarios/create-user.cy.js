describe('Criar usuário', () => {

    it('Deve criar um novo usuário com sucesso', () => {

        const userData = {
            userName: `testUser_${Date.now()}`,
            password: 'Password@123'
        };

        cy.request({
            method: 'POST',
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            body: userData,
            failOnStatusCode: false

        })
            .then((response) => {

            expect(response.status).to.equal(201)

            expect(response.body).to.have.property('userID')
            expect(response.body).to.have.property('username', userData.userName)


            const userId = response.body.userID
            cy.wrap(userId).as('createdUserId')
        });
    });
});
