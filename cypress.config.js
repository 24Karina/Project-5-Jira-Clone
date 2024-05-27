const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://jira.ivorreic.com/project/board',
    env: {
      baseUrl: 'https://jira.ivorreic.com/',
    },
    defaultCommandTimeout: 40000,
    requestTimeout: 20000,
  },
});