const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');
const { auth, checkRole } = require('../middleware/auth'); // Ensure you have authentication middleware

// router.get('/', auth, checkRole('admin'), studentController.getAllStudents);
router.get('/', auth, studentController.getAllStudents);
// router.put('/add-to-course/:courseId', auth, checkRole('admin'), studentController.addStudentsToCourse);
router.put('/add-to-course/:courseId', auth, studentController.addStudentsToCourse);

module.exports = router;
