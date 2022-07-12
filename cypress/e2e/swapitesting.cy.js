describe("Given there is a Star Wars API provided", () => {
  describe("When I search for spaceships", () => {
    let result;
    it(`should verify the Death Star Hyperdrive`, () => {
      cy.request("https://swapi.dev/api/starships/9/").as("deathstar");
      cy.get("@deathstar").then(result => {
        expect(result.status).to.eq(200);
        expect(result.body.hyperdrive_rating).to.eq('4.0');
      });
    });
  });
});
