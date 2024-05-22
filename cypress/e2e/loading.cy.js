describe('Loading the website on different browsers', () => {
  // defining array of browsers to test
  const browsers = ['chrome', 'firefox', 'edge', 'safari'];

  browsers.forEach(browser => {
    it(`Loading the map on ${browser}`, () => {
      // using cypress visit feature to test the loading of the page in different browsers
      cy.visit('http://localhost:8000/page.html', {
        browser: browser,
      });
      
      cy.title().should('contain', 'North London Map');
    });
  });
});
