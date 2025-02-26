/**
 * Logs in a user
 * @param {string} email - User email
 * @param {string} password - User password
 */
Cypress.Commands.add("login", (email, password) => {
  // Starting at login page (baseUrl from config)
  cy.visit("/login");

  // Pick a login method
  cy.contains("button", "Use password").click();

  // Basic form fill
  cy.get("#email").type(email);
  cy.get("#password").type(password, { log: false });

  // The main login action
  cy.contains("button", "Log in").click();

  // Auth might take a moment
  cy.url({ timeout: 10000 }).should("include", "/feed");
});

/**
 * Creates a post
 * @param {string} organization - Must match exactly from dropdown
 * @param {string} content - Text of post
 */
Cypress.Commands.add("createPost", (organization, content) => {
  // The "+ New Post" button equivalent
  cy.get("#item_start-conversation").click();

  // Org selection
  cy.get("#rc_select_0").type(organization);
  cy.contains(".ant-select-item-option-content", organization).click();

  // CKEditor is fussy - real events work better than regular typing
  cy.get('.ck-editor__editable[contenteditable="true"]', { timeout: 10000 })
    .should("be.visible")
    .then(($editor) => {
      // Click center to avoid any weird cursor positioning
      cy.wrap($editor)
        .realClick({ position: "center" })
        .realType(content, { delay: 10 });

      // Double-check the editor actually got the content
      cy.wrap($editor).should(() => {
        expect($editor[0].ckeditorInstance?.getData()).to.include(content);
      });
    });

  // Final post button
  cy.contains("button", "Post").click();
});

/**
 * Deletes a post
 * @param {string} content - Text of post
 */
Cypress.Commands.add("deletePost", (content) => {
  // Find the post card by its content text
  cy.contains(".rich-text.dont-break-out", content)
    .parents(".ant-card-body")
    .within(() => {
      // The meatballs menu
      cy.get('.feed-header__button[class*="ant-dropdown-trigger"]')
        .should("be.visible")
        // Force click because the dropdown animation sometimes messes things up
        .click({ force: true });
    });

  // Delete confirmation
  cy.get(".ant-dropdown-menu-item").contains("Delete").click({ force: true });
});
