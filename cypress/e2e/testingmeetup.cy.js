import searchdata from "../fixtures/searchdata.json";
searchdata.forEach(s =>  {

describe('Show different Cypress features', () => {
  it.only('uses different selectors and fixtures as testdata files', () => {
      cy.get('#search-keyword-input').debug();
      cy.dataCy('search-keyword-input').should("be.visible");
      cy.dataCy('search-keyword-input').type(s.search);
      cy.get('label')
        .contains('Choose your location')
        .siblings('div')
        .find('input')
        .type(s.location);
      cy.get("div").contains(`${s.location}, Netherlands`).click();
    });


    it('should use intelligent waiting and validate results', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://app.launchdarkly.com/sdk/goals/*',
    }, { fixture: "goals.json"}).as('getGoals');

    cy.dataCy('search-submit').click();

    cy.wait('@getGoals');

     cy.get('a').should('have.attr', 'href', 'https://www.meetup.com/Modern-Testing/events/286281495');
    
    cy.get('.line-clamp-3')
      .contains('Playwright Vs. Cypress - The Sequel')
      .click();

    cy.location((loc) => {
      expect(loc.pathname).to.eq(
        '/events/286281495'
      );
    });
  });

  it('should debug the information', () => {
    cy.get('span').contains('Viktor').debug();
  });
  
  it('should set the site to dimensions for an iphone XR.', () => {
    cy.viewport(414, 896);
    //  or:
    cy.viewport('iphone-xr');
    cy.screenshot();
  })

  before(() => {
    cy.visit('');
    cy.dataCy('search-intro-title').contains('Celebrating 20 years of real connections on Meetup');
  });
});
});