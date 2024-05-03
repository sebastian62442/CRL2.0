const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth'); // Make sure this path is correct
const CourseController = require('../controllers/CourseController'); // Path to the CourseController

// Applying 'auth' middleware to protect all course routes
router.use(auth);

// CRUD operations for courses
router.post('/', CourseController.createCourse); // Create a course
router.get('/', CourseController.getAllCourses); // Get all courses
router.get('/:id', CourseController.getCourseById); // Get a specific course
router.put('/:id', CourseController.updateCourse); // Update a course
router.delete('/:id', CourseController.deleteCourse); // Delete a course

router.get('/:id/students', auth, CourseController.getStudentsByCourse);
router.get('/:courseId/average', CourseController.calculateAverageGrade);
router.put('/:courseId/add-students', auth, CourseController.addStudentsToCourse);


module.exports = router;
