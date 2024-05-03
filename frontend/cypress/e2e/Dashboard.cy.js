describe('Dashboard Component', () => {
    beforeEach(() => {
        // Visit the page where your Dashboard component is rendered
        cy.visit('https://cams-purdue.netlify.app/');
    });

    it('renders the dashboard text', () => {
        // Check if the component renders "Dashboard" text
        cy.contains('Dashboard').should('exist');
    });
});
