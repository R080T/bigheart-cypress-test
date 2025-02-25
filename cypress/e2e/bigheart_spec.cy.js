describe("BigHeart App Test Suite", () => {
  it("Performs login, creates, verifies, and deletes a post", () => {
    cy.visit("https://qa.bigheartapp.org/login");

    cy.contains("button", "Use password").click();
    cy.get("#email").type("kandidat@example.com");
    cy.get("#password").type("RandomPassword123*!");
    cy.contains("button", "Log in").click();

    cy.url({ timeout: 10000 }).should("include", "/feed");

    cy.get("#item_start-conversation").click();

    cy.get("#rc_select_0").type("BigHeart Philanthropy");

    cy.contains(
      ".ant-select-item-option-content",
      "BigHeart Philanthropy"
    ).click();

    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("Cannot read properties of null (reading 'root')")
      ) {
        return false;
      }
    });

    cy.get('.ck-editor__editable[contenteditable="true"]', { timeout: 10000 })
      .should("be.visible")
      .then(($editor) => {
        cy.wrap($editor)
          .realClick({ position: "center" })
          .realType(" Test Post", { delay: 10 });

        cy.wrap($editor).should(() => {
          expect($editor[0].ckeditorInstance?.getData()).to.include(
            "Test Post"
          );
        });
      });

    cy.contains("button", "Post").click();

    cy.contains(".rich-text.dont-break-out", "Test Post")
      .parents(".ant-card-body")
      .within(() => {
        cy.get(".ant-btn-icon-only.feed-header__button")
          .eq(1)
          .should("be.visible")
          .click({ force: true });
      });

    cy.get(".ant-dropdown-menu-item").contains("Delete").click({ force: true });

    cy.get("body").then(($body) => {
      if (
        $body.find('.rich-text.dont-break-out:contains("Test Post")').length
      ) {
        cy.wait(2000);
      }
      cy.get(".rich-text.dont-break-out").should(($elements) => {
        const postExists = [...$elements].some((element) =>
          element.textContent.includes("Test Post")
        );
        expect(postExists).to.be.false;
      });
    });
  });
});
