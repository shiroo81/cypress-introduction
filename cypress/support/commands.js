Cypress.Commands.add('dataCy', value => cy.get(`[data-testid=${value}]`));
