describe('Offline feature', () => {
    beforeEach(() => {
        // ensures the page is loaded before each test
        cy.visit('http://localhost:8000/page.html');
    });

    it('Testing: if the website work offline', () => {
        // intercepting network requests to check offline behavior
        cy.intercept('GET', '**/*', { statusCode: 500 }).as('offlineRequest');

        // it's functioning after an extra 2 second wait
        cy.wait(2000);

        // it for the network request to complete (or a timeout)
        cy.wait('@offlineRequest');
    });
});
