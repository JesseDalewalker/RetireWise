describe('Navigation Bar (app.component.html)', () => {
    beforeEach(() => {
        cy.clearCookies();
    });

    it('Clicking on Home Redirects to Home Page', () => {
        cy.visit('http://localhost:4200/module');
        cy.get('.nav-bar-buttons .buttons').contains('Home').click();
        cy.url().should('include', 'http://localhost:4200/home')
    })

    it('Clicking on Module Redirects to Module Page', () => {
        cy.visit('http://localhost:4200/home');
        cy.get('.nav-bar-buttons .buttons').contains('Module').click();
        cy.url().should('include', 'http://localhost:4200/module')
    });
    
    it('Clicking on Login Redirects to Login Page', () => {
        cy.visit('http://localhost:4200/home');
        cy.get('.nav-bar-buttons .buttons').contains('Login').click();
        cy.url().should('include', 'http://localhost:4200/login')
    });

    it('RETIREWISE is displayed correctly', () => {
        cy.visit('http://localhost:4200/home');
        cy.get('.nav-bar-container .nav-bar-buttons .font-semibold').should('contain.text', 'RETIREWISE');
    });

    it('Displays Login Button when User is Not Logged In', () => {
        cy.visit('http://localhost:4200/home');
        cy.get('#login-button').should('exist');
    });

    it('Displays Logout Button when User is Logged In', () => {
        cy.visit('http://localhost:4200/login')
        cy.url().should('include', 'http://localhost:4200/login')
        
        cy.intercept('POST', 'http://localhost:5200/users/login').as('loginRequest');
    
        cy.get('#email').type('dyldom@mail.com')
        cy.get('#email').should('have.value', 'dyldom@mail.com')
    
        cy.get('#password').type('Password3!')
        cy.get('#password').should('have.value', 'Password3!')
        
        cy.get('#submit').click()
    
        cy.wait('@loginRequest').then((interception) => {
          if (interception?.response) {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('token');
          } else {
            throw new Error('Failed to intercept the request or response');
          }
        });
    
        cy.url().should('include', 'http://localhost:4200/home')

        cy.get('#logout-button').should('exist');
    });
})