describe('App Component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders the sidebar', () => {
        cy.get('[aria-label="open drawer"]').should('exist');
    });

    it('opens and closes the sidebar', () => {
        cy.get('[aria-label="open drawer"]').click();
        cy.get('[role="presentation"]').should('be.visible');

        cy.get('body').click(0, 0);
        cy.get('[role="presentation"]').should('not.be.visible');
    });

    it('navigates to different routes', () => {
        // Navigate to the login page
        cy.visit('/login');
        cy.url().should('include', '/login');

        // Navigate to the home page
        cy.visit('/');
        cy.url().should('not.include', '/login'); // Assuming '/' redirects to the home page

        // Navigate to the courses page
        cy.contains('Courses').click();
        cy.url().should('include', '/courses');

        // Navigate to a specific course detail page
        cy.contains('Course Detail').click(); // Replace 'Course Detail' with the appropriate text or selector
        cy.url().should('include', '/courses/');
    });

    it('renders not found page for unknown routes', () => {
        // Navigate to an unknown route
        cy.visit('/unknown-route');
        cy.contains('Not Found').should('exist');
    });
});
