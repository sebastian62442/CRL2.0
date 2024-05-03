describe('CourseCard', () => {
    beforeEach(() => {
        cy.visit('/'); // Assuming your app starts at the root URL
    });

    it('navigates to course detail page when card is clicked', () => {
        const courseId = 'example_course_id';
        cy.stub(window, 'fetch').resolves({ ok: true, json: () => Promise.resolve({ _id: courseId }) });

        cy.get('[data-testid="course-card"]').first().click();
        cy.url().should('include', `/courses/${courseId}`);
    });

    it('calls onDelete callback when delete button is clicked', () => {
        const courseId = 'example_course_id';
        cy.stub(window, 'fetch').resolves({ ok: true, json: () => Promise.resolve({ _id: courseId }) });
        cy.spy(window, 'fetch').as('deleteRequest');

        cy.get('[data-testid="delete-course-button"]').first().click();
        cy.get('@deleteRequest').should('have.been.calledWith', `/courses/${courseId}`, { method: 'DELETE' });
    });

    it('calls onEdit callback when edit button is clicked', () => {
        const courseId = 'example_course_id';
        cy.stub(window, 'fetch').resolves({ ok: true, json: () => Promise.resolve({ _id: courseId }) });
        cy.spy(window, 'fetch').as('editRequest');

        cy.get('[data-testid="edit-course-button"]').first().click();
        cy.get('@editRequest').should('have.been.calledWith', `/courses/${courseId}`, { method: 'PUT' });
    });

    // Additional tests can be added for other functionalities or edge cases
});
