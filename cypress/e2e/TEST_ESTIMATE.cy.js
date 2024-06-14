describe("Issue time tracking", () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
      });
  });
  
  // TEST ESTIMATE
it("Test time estimation functionality: add, edit and clear value", () => {
  
  // Create new issue
    cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.get(".ql-editor").type("TEST_DESCRIPTION");  
        cy.get(".ql-editor").should("have.text", "TEST_DESCRIPTION");
     
        cy.get('input[name="title"]').type("TEST_TITLE");
        cy.get('input[name="title"]').should("have.value", "TEST_TITLE");
  
        cy.get('button[type="submit"]').click().wait(40000);
        });
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
  
  //    add Initial Estimated Time 10h;
       cy.contains("TEST_TITLE").click().wait(40000);

       cy.get('[data-testid="modal:issue-details"]').within(() => {
          cy.get('[data-testid="icon:stopwatch"]')
            .next()
            .should("contain", "No time logged");
  
          cy.get("input:last").type(10);
          cy.get('[data-testid="icon:stopwatch"]')
            .next()
            .should("contain","10h estimated");
          cy.get('[data-testid="icon:close"]').should("be.visible").first().click().wait(40000);
        });
       cy.get('[data-testid="modal:issue-details"]').should("not.exist");
        
  //Verify that Estimated time is saved and then change it to 20
       cy.contains("TEST_TITLE").click().wait(40000);
       cy.get('[data-testid="modal:issue-details"]').within(() => {
          cy.get('[data-testid="icon:stopwatch"]')
             .next()
             .should("contain", "10h estimated");
          cy.get("input:last").clear().type(20);
          cy.get('[data-testid="icon:stopwatch"]')
            .next()
            .should("contain","20h estimated");
          cy.get('[data-testid="icon:close"]').should("be.visible").first().click().wait(40000);
        });
       cy.get('[data-testid="modal:issue-details"]').should("not.exist");
      
  //Verify that edited Estimated time is saved and tchen clear it
       cy.contains("TEST_TITLE").click().wait(40000);
       cy.get('[data-testid="modal:issue-details"]').within(() => {
          cy.get('[data-testid="icon:stopwatch"]')
            .next()
            .should("contain", "20h estimated");
          cy.get("input:last").clear();
          cy.get('[data-testid="icon:stopwatch"]')
            .next()
            .should("contain","No time logged");
          cy.get('[data-testid="icon:close"]').should("be.visible").first().click().wait(40000);
        });
       cy.get('[data-testid="modal:issue-details"]').should("not.exist");
  
  // Verify that cleared estimate is saved
       cy.contains("TEST_TITLE").click().wait(40000);
       cy.get('[data-testid="modal:issue-details"]').within(() => {
          cy.get('[data-testid="icon:stopwatch"]')
            .next()
            .should("contain","No time logged");
       });
  
    });
}); 
  