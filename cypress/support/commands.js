import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add('dataCy', value => cy.get(`[data-testid=${value}]`));
