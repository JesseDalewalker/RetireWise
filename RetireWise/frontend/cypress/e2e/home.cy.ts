describe('Home Page', () => {
    it('Home Page Works', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'http://localhost:4200/home')
    })
})