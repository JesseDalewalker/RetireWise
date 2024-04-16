describe('Signup Page', () => {
    beforeEach(() => {
        cy.clearCookies();
    });

    it('Signup Page Loads Successfully', () => {
        cy.visit('http://localhost:4200/signup')
        cy.url().should('include', 'http://localhost:4200/signup')
    });

    it('Empty Email and Password Fields', () => {
        cy.visit('http://localhost:4200/signup')
        cy.url().should('include', 'http://localhost:4200/signup')

        cy.get('#email').should('have.value', '')

        cy.get('#password').should('have.value', '')

        cy.get('#password2').should('have.value', '')

        cy.intercept('POST', 'http://localhost:5200/users/').as('signupRequest');

        cy.get('#submit').click()

        cy.wait(1000)

        cy.get('@signupRequest').should('not.exist')
    });

    it('Invalid Email, Valid Password', () => {
        cy.visit('http://localhost:4200/signup')
        cy.url().should('include', 'http://localhost:4200/signup')

        cy.get('#email').type('invalidemail')
        cy.get('#email').should('have.value', 'invalidemail')

        cy.get('#password').type('Password1!')
        cy.get('#password').should('have.value', 'Password1!')

        cy.get('#password2').type('Password1!')
        cy.get('#password2').should('have.value', 'Password1!')

        cy.intercept('POST', 'http://localhost:5200/users/').as('signupRequest');

        cy.get('#submit').click()

        cy.wait(1000)

        cy.get('@signupRequest').should('not.exist')
    })

    it('Valid Email, Invalid Passwords', () => {
        cy.visit('http://localhost:4200/signup')
        cy.url().should('include', 'http://localhost:4200/signup')

        cy.get('#email').type('validemail@mail.com')
        cy.get('#email').should('have.value', 'validemail@mail.com')

        cy.get('#password').type('Password')
        cy.get('#password').should('have.value', 'Password')

        cy.get('#password2').type('Password')
        cy.get('#password2').should('have.value', 'Password')

        cy.intercept('POST', 'http://localhost:5200/users/').as('signupRequest');

        cy.get('#submit').click()

        cy.wait(1000)

        cy.get('@signupRequest').should('not.exist')
    })

    it('Passwords Do Not Match', () => {
        cy.visit('http://localhost:4200/signup')
        cy.url().should('include', 'http://localhost:4200/signup')

        cy.get('#email').type('validemail@mail.com')
        cy.get('#email').should('have.value', 'validemail@mail.com')

        cy.get('#password').type('Password1!')
        cy.get('#password').should('have.value', 'Password1!')

        cy.get('#password2').type('Password1')
        cy.get('#password2').should('have.value', 'Password1')

        cy.intercept('POST', 'http://localhost:5200/users/').as('signupRequest');

        cy.get('#submit').click()

        cy.wait(1000)

        cy.get('@signupRequest').should('not.exist')
    })

    it('Duplicate Signup Not Possible', () => {
        cy.visit('http://localhost:4200/signup')
        cy.url().should('include', 'http://localhost:4200/signup')

        cy.get('#email').type('dyldom@mail.com')
        cy.get('#email').should('have.value', 'dyldom@mail.com')

        cy.get('#password').type('Password3!')
        cy.get('#password').should('have.value', 'Password3!')

        cy.get('#password2').type('Password3!')
        cy.get('#password2').should('have.value', 'Password3!')

        cy.intercept('POST', 'http://localhost:5200/users/').as('signupRequest');

        cy.get('#submit').click()

        cy.wait('@signupRequest').then((interception) => {
            if (interception?.response) {

                expect(interception.response.statusCode).to.eq(409);

                cy.on('window:alert', (message) => {
                    expect(message).to.equal('Email already exists. Please try another one.');
                });
                
            } else {
                throw new Error('Failed to intercept the request or response');
            }
        });
    })

    it('Valid Email and Matching Passwords', () => {
        cy.visit('http://localhost:4200/signup')
        cy.url().should('include', 'http://localhost:4200/signup')

        cy.get('#email').type('dyldom3@mail.com')
        cy.get('#email').should('have.value', 'dyldom3@mail.com')

        cy.get('#password').type('Password3!')
        cy.get('#password').should('have.value', 'Password3!')

        cy.get('#password2').type('Password3!')
        cy.get('#password2').should('have.value', 'Password3!')

        cy.intercept('POST', 'http://localhost:5200/users/').as('signupRequest');

        cy.get('#submit').click()

        cy.wait('@signupRequest').then((interception) => {
            if (interception?.response) {

                expect(interception.response.statusCode).to.eq(201);

                cy.on('window:alert', (message) => {
                    expect(message).to.equal('Successful account creation.');
                });

                cy.url().should('include', 'http://localhost:4200/login')

            } else {
                throw new Error('Failed to intercept the request or response');
            }
        });
    })
})    
