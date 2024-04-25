describe(`Module 1's Matching Cards Page`, () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/module/1/cards');
        cy.wait(1000);
    });

    it('Cards Page Loads', () => {
        cy.url().should('include', 'http://localhost:4200/module/1/cards');
    });

    it('All Card Page Elements Load', () => {
        cy.get('app-cards').should('exist');
        cy.contains('.titles', 'Matching Card Game').should('exist');
        cy.get('.term-container').should('exist');
        cy.get('.definition-container').should('exist');
        cy.get('button').contains('Done').should('exist');
    });

    it('Term Card Flips and Displays Term When Clicked', () => {
        cy.get('.term-container').first().contains('Term');
        cy.get('.term-container').first().click();

        cy.get('.term-container').first().then(($element) => {
            const text = $element.text();
            const phrasesToCheck = [
              'Long-Term Care Insurance',
              'IRA Account',
              'Consumer Debt',
              'A 401K Plan'
            ];
          
            const containsAnyPhrase = phrasesToCheck.some(phrase => text.includes(phrase));
            expect(containsAnyPhrase).to.be.true;
        });
    });

    it('Definition Card Flips and Displays Definition When Clicked', () => {
        cy.get('.definition-container').first().contains('Definition');
        cy.get('.definition-container').first().click();

        cy.get('.definition-container').first().then(($element) => {
            const text = $element.text();
            const phrasesToCheck = [
              'Protection in the event of a life',
              'Personal debts that',
              'A type of',
              'An employer-sponsored'
            ];
          
            const containsAnyPhrase = phrasesToCheck.some(phrase => text.includes(phrase));
            expect(containsAnyPhrase).to.be.true;
        });
    });

    it('Definition and Term Cards Correctly Turn Green When Matched', () => {
        cy.get('.term-front.term-side').first().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('.definition-front.definition-side').first().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');

        cy.get('.term-container').first().click();
        cy.get('.definition-container').first().click();

        cy.get('.term-back.term-side').should('have.css', 'background-color', 'rgb(0, 128, 0)');
        cy.get('.definition-back.definition-side').should('have.css', 'background-color', 'rgb(0, 128, 0)');
        
    });

    it('Display Correct Message When All Cards Do Not Match', () => {
        cy.get('button').contains('Done').click();

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please match all the cards.');
        });
    });

    it('Display Correct Message When All Cards Match and Redirect to Module Page', () => {
        cy.wait(1000);

        cy.get('.term-container').each(($el, index) => {
            cy.wait(1000);
            cy.wrap($el).click();
            cy.get('.definition-container').eq(index).click();
            cy.wait(1000);
        });

        cy.wait(1000);

        cy.get('button').contains('Done').click();

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Congratulations, you matched all the cards!');
        });

        cy.url().should('include', '/module');
    });
})