const express = require('express');
const { auth, checkRole } = require('../middleware/auth'); // Adjust the path as necessary
const router = express.Router();
const UserController = require("../controllers/UserController")
// Public routes
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);

// Protected routes
router.post('/logout', auth, UserController.logout);
router.get('/', auth, checkRole('admin'), UserController.getAllUsers); // Only admin can view all users
router.get('/:id', auth, checkRole('admin'), UserController.getUserById); // Only admin can view specific user
router.post('/', auth, checkRole('admin'), UserController.createUser); // Only admin can add users
router.put('/:id', auth, checkRole('admin'), UserController.updateUser); // Only admin can update users
router.delete('/:id', auth, checkRole('admin'), UserController.deleteUser); // Only admin can delete users

module.exports = router;
