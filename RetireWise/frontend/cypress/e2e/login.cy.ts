describe('Login Page', () => {
    it('Invalid Email and Password', () => {
      cy.visit('http://localhost:4200/login')
      cy.url().should('include', 'http://localhost:4200/login')
  
      cy.get('#email').type('dyld@mail.com')
      cy.get('#email').should('have.value', 'dyld@mail.com')
  
      cy.get('#password').type('Password3!')
      cy.get('#password').should('have.value', 'Password3!')
      
      cy.get('#submit').click()

      cy.url().should('include', 'http://localhost:4200/login')
    })
    
    it('Valid Email and Password', () => {
      cy.visit('http://localhost:4200/login')
      cy.url().should('include', 'http://localhost:4200/login')
  
      cy.get('#email').type('dyldom@mail.com')
      cy.get('#email').should('have.value', 'dyldom@mail.com')
  
      cy.get('#password').type('Password3!')
      cy.get('#password').should('have.value', 'Password3!')
      
      cy.get('#submit').click()
  
      cy.url().should('include', 'http://localhost:4200/home')
    })
})