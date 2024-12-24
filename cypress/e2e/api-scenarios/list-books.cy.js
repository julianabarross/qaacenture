describe('Listar os livros disponíveis', () => {

    it ('Listar livros disponíveis', () => {

        cy.request({
            method: "GET",
            url: "https://demoqa.com/BookStore/v1/Books"

        })
            .then((result) => {

                expect(result.status).equal(200)
                expect(result.body).to.have.property('books')
                expect(result.body.books).to.be.an('array')

                const books = result.body.books

                expect(books).to.have.length.greaterThan(0)
            })
    })

})