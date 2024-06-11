import { faker } from '@faker-js/faker';
// Used data:
const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
const getDeleteButton = () => cy.get('[data-testid="icon:trash"]');
const getConfirmModal = () => cy.get('[data-testid="modal:confirm"]');
const getDeleteIssueButton = () => cy.get('button').contains('Delete issue');
const getCancelButton = () => cy.get('button').contains('Cancel');
const iconClose = '[data-testid="icon:close"]';
const backLogList = '[data-testid="board-list:backlog"]';
const issueTitle = 'This is an issue of type: Task';

 function issueCountAssertions() {
    const initialIssueCount = 4
    cy.url().should("eq", `${Cypress.env("baseUrl")}project/board`);
    cy.get(backLogList)
      .should("be.visible")
      .and("have.length", "1")
      .children()
      .should("have.length", initialIssueCount - deletedIssueCount);
    if (deletedIssueCount < 1) {
      cy.get(backLogList).should("contain", issueTitle);
    } else {
      cy.get(backLogList).should("not.contain", issueTitle);
    }
}

describe('Issue delete', () => {
beforeEach(() => {
cy.visit('/');
cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
    cy.visit(url + '/board');
    cy.contains(issueTitle).click();
    getIssueDetailsModal().should('be.visible');
});
});

it('Should delete an issue and validate it successfully', () => {

const amountOfIssuesAfterDeletion = 3
let deletedIssueCount = 1

getIssueDetailsModal()
  .within(() => {
  getDeleteButton()
  .click(); 
  });
  
  getConfirmModal()
  .should('be.visible')
  .within(() => {
  getDeleteIssueButton().click(); 
  getConfirmModal().should('not.exist')
  });
   
  getIssueDetailsModal().should('not.exist');

cy.get(backLogList)
  .should('be.visible')
  .and('have.length', '1')
  .children()
  .should('have.length', '3')
  .within(() => {
      cy.contains(issueTitle).should('not.exist')

});
});


it('Should initiate issue deleting process and then canceling it', () => {

const amountOfIssuesWithoutDeletion = 4
let deletedIssueCount = 0 

getIssueDetailsModal()
  .should('be.visible')
  .within(() => {
      getDeleteButton().click();
});

getConfirmModal()
  .should('be.visible')
  .within(() => {
    getCancelButton().click();
});

getConfirmModal().should('not.exist');
getIssueDetailsModal()
  .should('be.visible')
  .within(() => {
    cy.get(iconClose).eq(0).click();
});

cy.get(backLogList)
  .should('be.visible')
  .and('have.length', '1')
  .children()
  .should('have.length','4')
  .within(() => {
    cy.contains(issueTitle).should('be.visible');
});

    

});
});