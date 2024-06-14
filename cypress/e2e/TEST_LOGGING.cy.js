describe("Issue time tracking", () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
      });
  });
  
it("Log time and then remove it successfully", () => {
// Create new issue
    cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.get(".ql-editor").type("TEST_DESCRIPTION");  
        cy.get(".ql-editor").should("have.text", "TEST_DESCRIPTION");
     
        cy.get('input[name="title"]').type("TEST_TITLE");
        cy.get('input[name="title"]').should("have.value", "TEST_TITLE");
  
        cy.get('button[type="submit"]').click().wait(40000);
        });
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
  
  //    Log 2 hours and set remaining hours to 5;
       cy.contains("TEST_TITLE").click().wait(40000);

       cy.get('[data-testid="modal:issue-details"]').within(() => {
           cy.get('[data-testid="icon:stopwatch"]').click().wait(40000);
       });
    
       cy.get('[data-testid="modal:tracking"]')
           .should("be.visible")
           .within(() => {
           cy.get('[data-testid="icon:stopwatch"]')
               .next()
               .should("contain","No time logged");
           cy.get("input:first").type(2);
           cy.get("input:last").type(5);
           cy.get('[data-testid="icon:stopwatch"]')
              .next()
              .should("contain", `2h logged`)
              .and("contain", `5h remaining`);
           cy.contains("button", "Done").click().wait(40000).should("not.exist");
           cy.get('[data-testid="modal:tracking"]').should("not.exist");
        }); 
        //validate that data is stored
        cy.get('[data-testid="modal:issue-details"]')
        .should("be.visible")
        .within(() => {
          cy.contains("No time logged").should("not.exist");
          cy.get('[data-testid="icon:stopwatch"]')
            .next()
            .should("contain", `2h logged`)
            .and("contain", `5h remaining`);
        });
 
        //Erase logged and remaining hours 
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:stopwatch"]').click().wait(40000);
        });
     
        cy.get('[data-testid="modal:tracking"]')
            .should("be.visible")
            .within(() => {
            cy.get('[data-testid="icon:stopwatch"]')
                .next()
            cy.get("input:first").clear();
            cy.get("input:last").clear();
            cy.get('[data-testid="icon:stopwatch"]')
               .next()
               .should("contain", `No time logged`);
            cy.contains("button", "Done").click().wait(40000).should("not.exist");
            cy.get('[data-testid="modal:tracking"]').should("not.exist");
         }); 
         //validate that data is stored
         cy.get('[data-testid="modal:issue-details"]')
         .should("be.visible")
         .within(() => {
           cy.contains("No time logged").should("exist");
         });
  








    });
});

