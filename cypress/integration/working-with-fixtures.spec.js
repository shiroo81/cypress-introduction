

describe('Complete Meetup test setup', () => {

  it('should be the same as the snapshot', () => {
    cy.get('#page').toMatchImageSnapshot({
      imageConfig: {
        threshold: 0.003
      },
      name: 'homepage'
    });
  });

  it('should use selectors', () => {
    expect( cy.get('h1').contains('Dive in! There are so many things to do on Meetup'));
  });

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

    cy.location((loc) => {
      expect(loc.pathname).to.eq('/find');
      expect(loc.search).to.eq(
        '?keywords=cypress%20dutch%20community&location=nl--Hilversum&source=EVENTS'
      );
    });

    expect(
      cy.get(
        'a[href="https://www.meetup.com/cypress-meetup-group-netherlands/events/280440133"]'
      )
    );

    cy.get('p')
      .contains('Cypress Meetup - Documenting your Cypress custom commands')
      .click();

    cy.location((loc) => {
      expect(loc.pathname).to.eq(
        '/nl-NL/cypress-meetup-group-netherlands/events/280440133'
      );
    });

    cy.get('.event-description').should('be.visible');
    expect(
      cy
        .get('p')
        .contains(
          '8:00 PM - Riccardo Corradin - Paul de Witt - Playwright Vs. Cypress - an introduction'
        )
    );
  });

  it('should debug the information', () => {
    cy.get('span').contains('Hosted by').debug();
  });
  
  it('should test the site on iphone XR.', () => {
    cy.viewport(414, 896);
    cy.screenshot();
  })
  before(() => {
    cy.visit('');
    cy.title().should('eq', 'Meetup - We are what we do');
  });
});
