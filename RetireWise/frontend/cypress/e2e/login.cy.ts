describe('Login Page', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('Empty Email and Password Fields', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.intercept('POST', 'http://localhost:5200/users/login').as('loginRequest');

    cy.get('#email').should('have.value', '')
    cy.get('#password').should('have.value', '')
    
    cy.get('#submit').click()

    cy.wait('@loginRequest').then((interception) => {
      if (interception && interception.response) {
        expect(interception.response.statusCode).to.eq(401);
      } else {
        throw new Error('Failed to intercept the request or response');
      }
    });

    cy.url().should('include', 'http://localhost:4200/login')
  })

  it('Valid Email and Invalid Password', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')

    cy.intercept('POST', 'http://localhost:5200/users/login').as('loginRequest');

    cy.get('#email').type('dyldom@mail.com')
    cy.get('#email').should('have.value', 'dyldom@mail.com')

    cy.get('#password').type('Password!')
    cy.get('#password').should('have.value', 'Password!')
    
    cy.get('#submit').click()

    cy.wait('@loginRequest').then((interception) => {
      if (interception && interception.response) {
        expect(interception.response.statusCode).to.eq(401);
      } else {
        throw new Error('Failed to intercept the request or response');
      }
    });

    cy.url().should('include', 'http://localhost:4200/login')
  })
  
  it('Valid Email and Password', () => {
    cy.visit('http://localhost:4200/login')
    cy.url().should('include', 'http://localhost:4200/login')
    
    cy.intercept('POST', 'http://localhost:5200/users/login').as('loginRequest');

    cy.get('#email').type('dyldom@mail.com')
    cy.get('#email').should('have.value', 'dyldom@mail.com')

    cy.get('#password').type('Password3!')
    cy.get('#password').should('have.value', 'Password3!')
    
    cy.get('#submit').click()

    cy.wait('@loginRequest').then((interception) => {
      if (interception && interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('token');
      } else {
        throw new Error('Failed to intercept the request or response');
      }
    });

    cy.url().should('include', 'http://localhost:4200/home')
  })

  it('Verifying Invalid Credentials POST Response', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5200/users/login',
      failOnStatusCode: false,
      body: {
        email: 'invalid@mail.com',
        password: 'invalidPassword!'
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  })

  it('Verifying Valid Credentials POST Response', () => {
    cy.request('POST', 'http://localhost:5200/users/login', {
      email: 'dyldom@mail.com',
      password: 'Password3!'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  })

})