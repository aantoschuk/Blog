describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  context("testing navbar and it's links", () => {
    it("should have all links and headers", () => {
      // find the navbar

      cy.get("nav")
        .should("exist")
        .within(() => {
          cy.contains("Sign Up"); // check for sign up text
          cy.contains("Sign In"); // check for sign in text
          cy.contains("Blog"); // check for blog text
          cy.get('a[href="/login"]').should("exist");
          cy.get('a[href="/signup"]').should("exist");
        });
    });

    it("testing login functionality", () => {
      cy.get('a[href="/login"]').click();

      cy.get("form").should("exist");

      // find and fill the inputs
      cy.get('input[name="email"]')
        .should("exist")
        .type("hutir.gaming@gmail.com");
      cy.get('input[name="password"]').should("exist").type("12345678");

      cy.get("button").contains("Log In").should("exist").click();

      // check if successfully redirected to home page
      cy.url().should("eq", "http://localhost:3000/");

      cy.get("nav")
        .should("exist")
        .within(() => {
          cy.contains("Profile");
          cy.contains("Log Out");
        });
    });
  });

  it("Should contain Blog header", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // The new page should contain an h1 with "About"
    cy.get("h1").contains("Blog");
  });
});
