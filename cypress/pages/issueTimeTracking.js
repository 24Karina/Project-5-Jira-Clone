// cypress/support/issueDetail.js

class IssueDetail {
    constructor() {
      this.originalEstimateField = 'input[name="originalEstimate"]';
      this.timeTrackingSection = '.time-tracking';
      this.noTimeLoggedLabel = '.no-time-logged';
    }
  
    openIssue(issueId) {
      cy.visit(`/issues/${issueId}`); // Adjust the URL according to your app's routing
    }
  
    addOriginalEstimate(hours) {
      cy.get(this.originalEstimateField).clear().type(hours);
    }
  
    closeIssueDetail() {
      cy.get('button.close-issue-detail').click(); // Adjust selector as necessary
    }
  
    verifyTimeTracking(hours) {
      cy.get(this.timeTrackingSection).contains(hours).should('exist');
    }
  
    verifyNoTimeLogged() {
      cy.get(this.noTimeLoggedLabel).should('exist');
    }
  
    verifyOriginalEstimateFieldPlaceholder() {
      cy.get(this.originalEstimateField).invoke('attr', 'placeholder').should('equal', 'Number');
    }
  }
  
  export default IssueDetail;