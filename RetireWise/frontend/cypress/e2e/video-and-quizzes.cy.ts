describe(`Module 1's First Video and Quiz Page`, () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/module/1/videoandquizzes/1');
    });
    
    it('Video and Quiz Page Loads', () => {
        cy.url().should('include', 'http://localhost:4200/module/1/videoandquizzes/1')
    });

    it('Video and Quiz Data is Displayed', () => {
        cy.get('app-video-and-quizzes').should('exist');
        cy.get('iframe').should('have.attr', 'src').and('include', 'https://www.youtube.com/embed/');

        cy.get('iframe').should('exist');

        cy.get('.multiple-c').should('exist');

        cy.get('.buttons').should('have.length.gt', 0);
    });

    it('Selected Options Update Correctly When Clicking On A Quiz Option', () => {
        cy.get('.multiple-c li').first().click();
        cy.get('.multiple-c li').first().should('have.class', 'selected');
    });

    it('Clicking on Matching Card Game Button Correctly Navigates to Corresponding Cards page', () => {
        cy.contains('Matching Card Game').click();
        cy.url().should('include', 'http://localhost:4200/module/1/cards');
    });

    it('Incorrect Selected Option Turns Red', () => {
        cy.get('.multiple-c li').eq(1).click();
        cy.get('.multiple-c li').eq(1).should('have.class', 'incorrect').and('have.css', 'background-color', 'rgb(248, 215, 218)');
    });
    
    it('Correct Selected Option Turns Green', () => {
        cy.get('.multiple-c li').eq(3).click();
        cy.get('.multiple-c li').eq(3).should('have.class', 'correct').and('have.css', 'background-color', 'rgb(212, 237, 218)');
    });
})