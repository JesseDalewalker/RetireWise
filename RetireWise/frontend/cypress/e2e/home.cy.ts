describe('Home Page', () => {
    it('Home Page Loads Correctly', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'http://localhost:4200/home')
        
        cy.contains('Ways To Learn About Retirement').should('be.visible')
    })

    it('Carousel Should Display', () => {
        cy.visit('http://localhost:4200/home');
        cy.url().should('include', 'http://localhost:4200/home')
        
        cy.get('.carousel').should('be.visible');
    });
    
    it('Carousel Autoplay Should Work', () => {
        cy.visit('http://localhost:4200/home');
        cy.url().should('include', 'http://localhost:4200/home')

        cy.get('.slick-active').should('exist');
        cy.wait(4000);
        cy.get('.slick-active').should('exist').then(($activeSlide1) => {
            cy.wait(3000);
            cy.get('.slick-active').should('exist').then(($activeSlide2) => {
                expect($activeSlide1.text()).not.to.equal($activeSlide2.text());
            });
        });
    });
})