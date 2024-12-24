describe('Alugar livros', () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QxMjM0NTY3OCIsInBhc3N3b3JkIjoiUGFzc3dvcmRAMTIzIiwiaWF0IjoxNzM0NjU5NTg5fQ.xXwplu_6GbDBP-HWk_LI02ai6Cqojy8Nqc6gsFp1Lic' // Substitua pelo token gerado
    const userId = '437d7fc2-31b7-426d-acd5-d0efc07daef9'

    it('Deve alugar dois livros com sucesso', () => {

        const bookIds = [
            { isbn: '9781449325862' },
            { isbn: '9781449331818' }
        ];

        cy.request({
            method: 'POST',
            url: 'https://bookstore.demoqa.com/BookStore/v1/Books',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                userId: userId,
                collectionOfIsbns: bookIds
            },
            failOnStatusCode: false
        })
            .then((response) => {
            expect(response.status).to.equal(201);

            expect(response.body.books).to.have.length(2);
            expect(response.body.books[0]).to.have.property('isbn', bookIds[0].isbn);
            expect(response.body.books[1]).to.have.property('isbn', bookIds[1].isbn);
        });
    });

    it('Deve retornar erro ao tentar alugar livros inexistentes', () => {

        const invalidBookIds = [
            { isbn: '0000000000000' },
            //{ isbn: '1111111111111' }
        ];

        cy.request({
            method: 'POST',
            url: 'https://bookstore.demoqa.com/BookStore/v1/Books',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                userId: userId,
                collectionOfIsbns: invalidBookIds
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(400);

            expect(response.body).to.have.property('message');
            expect(response.body.message).to.contain('ISBN supplied is not available in Books Collection!');
        });
    });
});
