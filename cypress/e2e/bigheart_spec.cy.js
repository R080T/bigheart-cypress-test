describe("BigHeart App Test Suite", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user_email"), Cypress.env("user_password"));
  });

  it("Creates, verifies, and deletes a post", () => {
    const testPostContent = "Test Post";
    const testOrganization = "BigHeart Philanthropy";

    // Create post
    cy.createPost(testOrganization, testPostContent);

    // Verify post creation
    cy.contains(".rich-text.dont-break-out", testPostContent).should(
      "be.visible"
    );

    // Delete post
    cy.deletePost(testPostContent);

    // Verify post deletion
    cy.contains(".rich-text.dont-break-out", testPostContent).should(
      "not.exist"
    );
  });
});
