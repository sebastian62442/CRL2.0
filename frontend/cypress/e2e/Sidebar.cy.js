describe('Sidebar Component', () => {
    beforeEach(() => {
        // Visit the page where your Sidebar component is rendered
        cy.visit('https://cams-purdue.netlify.app/');
    });

    it('renders the sidebar', () => {
        // Check if the sidebar toggle button exists
        cy.get('[aria-label="open drawer"]').should('exist');

        // Check if the sidebar is initially closed
        cy.get('[role="presentation"]').should('not.be.visible');
    });

    it('opens and closes the sidebar', () => {
        // Click the sidebar toggle button to open the sidebar
        cy.get('[aria-label="open drawer"]').click();

        // Check if the sidebar is opened
        cy.get('[role="presentation"]').should('be.visible');

        // Click outside the sidebar to close it
        cy.get('body').click(0, 0); // Click at coordinates (0, 0) outside the sidebar

        // Check if the sidebar is closed
        cy.get('[role="presentation"]').should('not.be.visible');
    });

    it('navigates to different paths when menu items are clicked', () => {
        // Click on the "Courses" menu item
        cy.get('[aria-label="open drawer"]').click();
        cy.contains('Courses').click();

        // Check if the URL matches the expected path
        cy.url().should('include', '/courses');

        // Click on the "Users" menu item
        cy.get('[aria-label="open drawer"]').click();
        cy.contains('Users').click();

        // Check if the URL matches the expected path
        cy.url().should('include', '/users');
    });

    it('logs out when the logout button is clicked', () => {
        // Mocking the logout function
        cy.window().then((win) => {
            win.logout = cy.stub().as('logout');
        });

        // Click on the logout button
        cy.get('[aria-label="open drawer"]').click();
        cy.contains('Logout').click();

        // Check if the logout function is called
        cy.get('@logout').should('be.called');

        // Check if the URL navigates to the login page after logout
        cy.url().should('include', '/login');
    });
});
