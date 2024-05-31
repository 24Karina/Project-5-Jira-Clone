describe('Issue delete', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });

    it('delete issue', () => {

        getIssueDetailsModal()
        .should('be.visible')
        .within(() => {
            cy.get('[data-testid="icon:trash"]').click();
         });
        
        getConfirmationModal()
        .should('be.visible')
        .within(() => {
            cy.contains ('Delete issue').should('be.visible').click();
            
         });

        getConfirmationModal()
        .should('not.exist');
        
        cy.get('[data-testid="list-issue"]')
        .should("be.visible")
        .contains('This is an issue of type: Task').should('not.exist')    

    });

    it ('issue deletion cancellation', () => {
        getIssueDetailsModal()
        .should('be.visible')
        .within(() => {
            cy.get('[data-testid="icon:trash"]').click();
         });
        
        getConfirmationModal()
        .should('be.visible')
        .within(() => {
            cy.contains ('Cancel').should('be.visible').click();
            
         });

        getConfirmationModal()
        .should('not.exist');

        cy.get('[data-testid="icon:close"]').first().should("be.visible").click();
        cy.get('[data-testid="list-issue"]')
        .should("be.visible")
        .contains('This is an issue of type: Task');
         
        });

const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
const getConfirmationModal = () => cy.get('[data-testid="modal:confirm"]');
 

}); 

