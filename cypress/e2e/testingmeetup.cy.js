

describe('Show different Cypress features', () => {

  it('uses different selectors and fixtures as testdata files', () => {
    cy.fixture('searchdata').then((s) => {
      cy.get('#search-keyword-input').click();
      cy.dataCy('search-keyword-input').should("be.visible");
      cy.dataCy('search-keyword-input').type(s.search);
      cy.get('label')
        .contains('Choose your location')
        .siblings('div')
        .find('input')
        .type(s.location);
      cy.get("div").contains(`${s.location}, Netherlands`).click();
    });
  });

    it('should use intelligent waiting and validate results', () => {

    cy.intercept({
      method: 'GET',
      url: 'https://app.launchdarkly.com/sdk/goals/*',
    }).as('getGoals');

    cy.dataCy('search-submit').click();

    cy.wait('@getGoals');

    expect(
      cy.get(
        'a[href="https://www.meetup.com/Modern-Testing/events/286281495"]'
      )
    );

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
    // cy.get('time').contains('7:00');
  });
  
  // it('should test the site on iphone XR.', () => {
  //   cy.viewport(414, 896);
  //   cy.screenshot();
  // })

  before(() => {
    cy.visit('');
    cy.dataCy('search-intro-title').contains('Celebrating 20 years of real connections on Meetup');
  });
});
