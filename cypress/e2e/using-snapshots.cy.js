
describe('Snapshot testing', () => {

    it('should be the same as the snapshot', () => {
      cy.get('#page').toMatchImageSnapshot({
        imageConfig: {
          threshold: 0.01
        },
        name: 'homepage'
      });
    });
});