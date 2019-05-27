/// <reference types="Cypress" />

context('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('homepage should be visible', () => {
    cy.get('#app')
      .scrollIntoView({ offset: 100 })
      .should('be.visible')
      .children('.app-title')
      .should('contain', 'New York Times Most Popular Articles');
  });

  it('the 20th news item should be visible', () => {
    cy.get('.app-listing-card:nth-child(10)')
      .scrollIntoView()
      .should('be.visible');
  });

  it('.click() - click on a news items', () => {
    cy.get('.app-listing-card:nth-child(5)').click();
    cy.get('.app-listing-card:nth-child(5)').should('not.be.visible');
  });

  it('cy.viewport() - set the viewport size and dimension', () => {
    cy.get('.app-listing-card').should('be.visible');

    cy.viewport(320, 480);

    cy.get('.app-listing-card').should('be.visible');

    cy.viewport(2999, 2999);

    cy.viewport('macbook-15');
    cy.wait(200);
    cy.viewport('ipad-2');
    cy.wait(200);
    cy.viewport('ipad-mini');
    cy.wait(200);
    cy.viewport('iphone-6+');
    cy.wait(200);
    cy.viewport('iphone-6');
    cy.wait(200);
    cy.viewport('iphone-5');
    cy.wait(200);
    cy.viewport('iphone-4');
    cy.wait(200);
    cy.viewport('iphone-3');
    cy.wait(200);

    cy.viewport('ipad-2', 'portrait');
    cy.wait(200);
    cy.viewport('iphone-4', 'landscape');
    cy.wait(200);
  });
});
