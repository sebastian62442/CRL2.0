describe('AuthForm Component', () => {
    beforeEach(() => {
        cy.visit('https://cams-purdue.netlify.app/login'); // Assuming the AuthForm is rendered at the '/login' route
    });

    it('allows user to login with admin role', () => {
        // Select "Admin" role from dropdown
        cy.get('#role').select('Admin');

        // Enter username and password
        cy.get('#username').type('nikhila1@email.com');
        cy.get('#password').type('1234');

        // Click the submit button
        cy.get('button[type="submit"]').click();

        // Check if the URL navigates to the courses page after successful login
        cy.url().should('include', '/courses');
    });

    
});
