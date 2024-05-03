const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth'); // Make sure this path is correct
const GradeController = require('../controllers/GradeController'); // Path to the GradeController

// Applying 'auth' middleware to protect all grade routes
router.use(auth);

// CRUD operations for grades
router.post('/', GradeController.recordGrade); // Record a grade
router.get('/', GradeController.viewGradesForAssessment); // View grades for an assessment
router.get('/:id', GradeController.getGradeById); // Get a specific grade
router.put('/:id', GradeController.updateGrade); // Update a grade
router.delete('/:id', GradeController.deleteGrade); // Delete a grade
router.get('/course/:courseId', GradeController.getGradesForCourse);

module.exports = router;
