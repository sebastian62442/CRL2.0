const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth'); // Ensure this path is correct
const AssessmentController = require('../controllers/AssessmentController'); // Path to the AssessmentController

// Applying 'auth' middleware to protect all assessment routes
router.use(auth);

router.post('/', AssessmentController.createAssessment); // Create an assessment
router.get('/', AssessmentController.getAllAssessments); // Get all assessments for a course
router.get('/:id', AssessmentController.getAssessmentById); // Get a specific assessment
router.put('/:id', AssessmentController.updateAssessment); // Update an assessment
router.delete('/:id', AssessmentController.deleteAssessment); // Delete an assessment

module.exports = router;
