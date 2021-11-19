describe('Complete Meetup test setup', () => {
  it('uses fixtures as testdata files', () => {
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

  before(() => {
    cy.visit('');
  });
});
