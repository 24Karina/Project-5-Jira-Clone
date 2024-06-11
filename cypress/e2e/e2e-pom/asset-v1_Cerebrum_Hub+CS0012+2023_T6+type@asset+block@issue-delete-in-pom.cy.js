import IssueModal from "../../pages/IssueModal";

const issueTitle = 'This is an issue of type: Task.';

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.contains(issueTitle).click();
    });
  });

  it('Should delete issue successfully', () => {
    const expectedAmountOfIssuesAfterDeletion = 3;

    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
    IssueModal.validateAmountOfIssuesInBacklog(expectedAmountOfIssuesAfterDeletion);
  });

  it('Should cancel delete issue process successfully', () => {
    const expectedAmountOfIssuesAfterCancel = 4;

    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
    IssueModal.validateAmountOfIssuesInBacklog(expectedAmountOfIssuesAfterCancel);
  });
});
