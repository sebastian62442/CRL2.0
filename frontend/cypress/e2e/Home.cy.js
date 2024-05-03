

describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('https://cams-purdue.netlify.app/'); // Assuming your Home component is served at the root URL
    });
  
    it('renders university name and logo correctly', () => {
      cy.get('img[alt="University Logo"]').should('be.visible'); // Ensure the university logo is rendered
      cy.contains('Course Assessment Management System').should('be.visible'); // Ensure the university name is rendered
    });
  
    it('renders navigation links correctly', () => {
      cy.contains('Login').should('be.visible'); // Ensure the login link is rendered
      cy.contains('Register').should('be.visible'); // Ensure the register link is rendered
    });
  
    it('renders main content correctly', () => {
      cy.contains('Enhance Your Learning Experience').should('be.visible'); // Ensure the main title is rendered
      cy.contains('Our Mission').should('be.visible'); // Ensure the mission section title is rendered
      cy.contains('How It Works').should('be.visible'); // Ensure the how it works section title is rendered
      cy.contains('Join Us').should('be.visible'); // Ensure the join us section title is rendered
    });
  
    it('redirects to login page when "Login" button is clicked', () => {
      cy.contains('Login').click(); // Click the "Login" button
      cy.url().should('include', '/login'); // Ensure redirection to the login page
    });
  
    // Add more tests as needed for form validation, user interactions, etc.
  });
  