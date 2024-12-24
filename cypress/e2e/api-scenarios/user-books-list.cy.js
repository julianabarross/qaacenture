describe('Lista de detalhes do usuário com o livro alugado', () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QxMjM0NTY3OCIsInBhc3N3b3JkIjoiUGFzc3dvcmRAMTIzIiwiaWF0IjoxNzM0NjU5NTg5fQ.xXwplu_6GbDBP-HWk_LI02ai6Cqojy8Nqc6gsFp1Lic'
    const userId = '437d7fc2-31b7-426d-acd5-d0efc07daef9'

    it('Deve listar os detalhes do usuário com o livro alugado', () => {

        cy.request({
            method: 'GET',
            url: `https://bookstore.demoqa.com/Account/v1/User/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {

            expect(response.status).to.equal(200);

            expect(response.body).to.have.property('userId');
            expect(response.body).to.have.property('username');

            // Verifica se o livro alugado está listado nos detalhes do usuário
            expect(response.body.books).to.be.an('array'); // Verifica se 'books' é um array
            expect(response.body.books).to.have.length.greaterThan(0); // Verifica se ao menos 1 livro foi alugado

            // Verifica se o ISBN do livro alugado está presente
            const rentedBookIsbn = '9781449325862'; // ISBN do livro que foi alugado
            const rentedBook = response.body.books.find(book => book.isbn === rentedBookIsbn);
            expect(rentedBook).to.exist; // Verifica se o livro foi alugado
            expect(rentedBook.isbn).to.equal(rentedBookIsbn); // Verifica se o ISBN do livro alugado está correto
        });
    });
});
