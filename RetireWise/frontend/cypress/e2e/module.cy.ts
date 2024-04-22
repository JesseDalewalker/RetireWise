describe('Module Page', () => {

  it('Module Page Loads Correctly', () => {
    cy.visit('http://localhost:4200/module')
    cy.url().should('include', 'http://localhost:4200/module')
  });

  it('All 5 Modules Successfully Rendered as Buttons', () => {
    cy.visit('http://localhost:4200/module')
    cy.url().should('include', 'http://localhost:4200/module')
  
    cy.get('.moduleButtons').should('have.length', 5);
  });

  it(`Clicking Module 1 Button should lead to Module 1's First Video and Quiz Page`, () => {
    cy.visit('http://localhost:4200/module')
    cy.url().should('include', 'http://localhost:4200/module')

    cy.get('.moduleButtons').first().click();
    cy.url().should('include', 'http://localhost:4200/module/1/videoandquizzes/1');
  });
})